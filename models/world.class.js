class World {
  character = new Character();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  coinCounter = 0;
  bottleCounter = 5;
  shootable = true;
  level = level1;
  endboss = this.level.enemies[this.level.enemies.length - 1];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  gameover = false;
  win = false;
  points = 0;
  addedPoints = 0;

  coinSound = new Audio('./audio/coin.mp3');
  bottleSound = new Audio('./audio/bottle.mp3');
  levelMusic = new Audio('./audio/level_music.mp3');
  endbossMusic = new Audio('./audio/endboss.mp3');


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld()
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkCollisionBottle();
      this.checkThrowObjects();
      this.fadeInMusic();
      this.fadeOutMusic();
      this.checkMute();
      this.checkPaused();
    }, 200);

    setInterval(() => {
      this.checkCoinHarvest();
      this.checkBottleHarvest();
    }, 1000/100);


    setInterval(() => {
      this.checkJumpOnEnemy();
    }, 50);

    this.levelMusic.loop = true;
    this.playSound(this.levelMusic, 1);
  }


  /**
   * Check if character collides with enemy - if yes, execute hit-function and set new bar-image
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isAboveGround() && enemy.energy) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }


  /**
   * Check if character jumps on enemy - if yes, character kills enemy
   */
  checkJumpOnEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.isAboveGround() && enemy.energy && (enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
        this.getPoints(enemy);
        enemy.energy = 0;  
      }
    });
  }



  /**
   * Check collision with coins - if yes, play sound and execute collecting-function
   */
  checkCoinHarvest() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin) && coin.width != 0 && coin.height != 0) {
        this.collectCoin(coin);
        this.statusBarCoin.setPercentage(this.coinCounter);
        this.playSound(this.coinSound, 0.5);
      }
    })
  }


  /**
   * Collecting Coins - Adding to counter and resize them to null
   * @param {Coin} bottle 
   */
  collectCoin(coin) {
    if (this.coinCounter < 5) {
      this.coinCounter++;
    }
    this.points += 1000;
    this.showPoints();
    this.showAddedPoints(1000);
    coin.width = 0;
    coin.height = 0;
  }


  /**
   * Check collision with collectable bottles - if yes, play sound and execute collecting-function
   */
  checkBottleHarvest() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle) && bottle.width != 0 && bottle.height != 0) {
        this.collectBottle(bottle);
        this.statusBarBottle.setPercentage(this.bottleCounter);
        this.playSound(this.bottleSound, 0.5);
      }
    })
  }


  /**
   * Collecting Bottles - Adding to counter and resize them to null
   * @param {Bottle} bottle 
   */
  collectBottle(bottle) {
    if (this.bottleCounter < 5) {
      this.bottleCounter++;
    }
    bottle.width = 0;
    bottle.height = 0;
  }


  /**
   * Creates throwable Bottles and put in array
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottleCounter) {
      setTimeout(() => {
        this.shootable = true;
      }, 500);
      if (this.shootable) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        if (this.character.otherDirection) {
          bottle.speedX *= -1;
          bottle.x = this.character.x;
        }
        this.bottleCounter--;
        this.statusBarBottle.setPercentage(this.bottleCounter);
        this.throwableObjects.push(bottle);
        this.shootable = false;
      }
    }
  }


  /**
 * Check if throwed bottle hits enemy
 */
  checkCollisionBottle() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((bottle) => {
        if (bottle.isColliding(enemy) && !bottle.splashed) {
          enemy.energy -= 25;
          enemy.hit();
          bottle.enemyHit = true;
          this.getPoints(enemy);
          console.log(enemy.energy);
          // bottle.splashed = true;
          if(enemy instanceof Endboss) {
            this.statusBarEndboss.setPercentage(enemy.energy);
          }
        }
      })
    })
  }


  getPoints(enemy) {
    let amount = 0;
    if(enemy instanceof Chicken) {
      amount = 300;
    } else if(enemy instanceof ChickenSmall) {
      amount = 500;
    } else if (enemy instanceof Endboss) {
      amount = 1500;
    }
    this.points += amount;
    this.showAddedPoints(amount);
    this.showPoints();
  }


  /**
   * Check if sound is muted
   */
  checkMute() {
    if (mutedMusic) {
      this.pauseSound(this.levelMusic);
    } else {
      this.playSound(this.levelMusic, 1);
      this.fadeInMusic();
    }
  }


  /**
   * Play audio-file by given volume
   * @param {Audio} sound 
   * @param {number} volume 
   */
  playSound(sound, volume) {
    if (!mutedSounds) {
      sound.play();
      sound.volume = volume;
    } else {
      this.pauseSound(sound);
    }
  }


  /**
   * Pause audio-file
   * @param {Audio} sound 
   */
  pauseSound(sound) {
    sound.pause();
    // sound.volume = 0;
  }


  /**
   * Fade in Boss-Music by checking distance to character
   */
  fadeInMusic() {
    setInterval(() => {
      let dis = this.endboss.distanceTo(this.character);
      if (mutedMusic || this.gameover || dis > 1200) {
        this.endbossMusic.volume = 0;
      } else {
        if (dis < 1200 && dis > 500 && !paused) {
          this.endbossMusic.play();
          let vol = (1200 - dis) / 700;
          this.endbossMusic.volume = vol;
        } else if (dis < 500 && !paused) {
          this.endbossMusic.play();
          this.endbossMusic.volume = 1;
        }
      }
    }, 200);
  }


  /**
   * Fade out level Music by checking distance to character
   */
  fadeOutMusic() {
    setInterval(() => {
      let dis = this.endboss.distanceTo(this.character);
      if (dis < 1500 && dis > 800) {
        let vol = 1 - (1500 - dis) / 700;
        this.levelMusic.volume = vol;
      } else if (dis < 800) {
        this.levelMusic.volume = 0;
      }
    }, 200);
  }


  checkPaused() {
    if(paused) {
      this.pauseSound(this.levelMusic);
      this.pauseSound(this.endbossMusic);
    } else {

      this.fadeOutMusic();
      this.fadeInMusic();
    }
  }


  /**
   * Drawing elements on canvas-context
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    //Background Elements
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);


    //Cam back
    this.ctx.translate(-this.camera_x, 0);
    // ----- Space for fixed objects like statBar -----
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarEndboss);
    // this.addToMap(this.statusBarCoin); 
    this.addToMap(this.statusBarBottle);
    //Cam forward
    this.ctx.translate(this.camera_x, 0);

    //Foreground Elements
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);


    this.ctx.translate(-this.camera_x, 0);

    //requestAnimation Funktion kennt kein 'this' - die Funktion wird abhängig von Grafikleistung wiederholt aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw(); 
    });
  }


  /**
   * Addin Images from array to canvas-context
   * @param {array} objects 
   */
  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    })
  }


  /**
   * Adding Image of Movable Object to canvas-context
   * @param {Movable Object} mo 
   */
  addToMap(mo) {
    //Bilder spiegeln wenn Character nach links läuft
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    // mo.drawBorder(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Mirrors images of movable Object
   * @param {Movable Object} mo 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    //X-Koordinate muss negiert werdern weil jetzt von rechts gezählt wird
    mo.x = mo.x * -1;
  }


  /**
   * Mirrors images back
   * @param {Movable Object} mo 
   */
  flipImageBack(mo) {
    //X-Koordinate wird wieder negiert
    mo.x = mo.x * -1;
    this.ctx.restore();
  }


  showPoints() {
    document.getElementById('point-counter').innerHTML = this.points;
  }

  showAddedPoints(amount) {
    document.getElementById('added-points').innerHTML += `+${amount} <br>`;
    setTimeout(() => {
      document.getElementById('added-points').innerHTML = '';
    }, 1000)
  }


  stopGame() {   
    intervalIds.forEach(clearInterval);
    this.pauseSound(this.levelMusic);
    this.pauseSound(this.endbossMusic);
    if(!this.win) {
      this.playSound(this.character.die_sound, 0.4);
      this.gameover = true;
      // this.looseGame();
    } else if(this.win) {
      setTimeout(() => {
        this.endboss.dieCharacter();
        this.playSound(this.endboss.falling, 0.4);
      }, 1000);
      //this.winGame();
    }
  }
}


