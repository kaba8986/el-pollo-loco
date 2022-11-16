class World {
  character = new Character();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
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

  coinSound = new Audio('./audio/coin.mp3');
  bottleSound = new Audio('./audio/bottle.mp3');
  levelMusic = new Audio('./audio/level_music.mp3');
  endboss_music = new Audio('./audio/endboss.mp3');


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
    setInterval(() => {
      this.checkCollisions();
      this.checkCoinHarvest();
      this.checkBottleHarvest();
      this.checkCollisionBottle();
      this.checkThrowObjects();
      this.fadeInMusic();
      this.fadeOutMusic();
      this.checkMute();
    }, 200);


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
      if (this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
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
          // bottle.splashed = true;
        }
      })
    })
  }


  /**
   * Check if sound is muted
   */
  checkMute() {
    if (mutedMusic) {
      this.levelMusic.pause();
    } else {
      this.levelMusic.play();
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
    sound.volume = 0;
  }


  /**
   * Fade in Boss-Music by checking distance to character
   */
  fadeInMusic() {
    setInterval(() => {
      let dis = this.endboss.distanceTo(this.character);
      if (mutedMusic) {
        this.endboss_music.volume = 0;
      } else {
        if (dis < 1200 && dis > 500) {
          this.endboss_music.play();
          let vol = (1200 - dis) / 700;
          this.endboss_music.volume = vol;
        }
      }
    }, 1000);
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
      }
    }, 1000);
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
    this.addToMap(this.statusBarCoin);
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
}


