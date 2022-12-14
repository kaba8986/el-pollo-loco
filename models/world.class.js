class World {

  canvas;
  ctx;
  keyboard;

  character = new Character();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  level = level1;
  endboss = this.level.enemies[this.level.enemies.length - 1];

  camera_x = 0;
  points = 0;
  addedPoints = '';
  collectedBottles = 0;
  killedChicken = 0;
  killedSmallChicken = 0;
  killedEndboss = 0;

  shootable = true;
  loosable = true;
  gameover = false;
  win = false;

  coinSound = new Audio('./audio/coin.mp3');
  bottleSound = new Audio('./audio/bottle.mp3');
  levelMusic = new Audio('./audio/level_music.mp3');
  endbossMusic = new Audio('./audio/endboss.mp3');
  win = new Audio('./audio/win.mp3');
  loose = new Audio('./audio/loose.mp3');


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
      this.checkGameCollisions();
      this.controllAllSounds();
    }, 100);

    setInterval(() => {
      this.checkJumpOnEnemy();
    }, 50);

    this.levelMusic.loop = true;
    this.playMusic(this.levelMusic, 0.8);
  }


  //COLLIDING FUNCTIONS
  checkGameCollisions() {
    this.checkCollisions();
    this.checkCollisionBottle();
    this.checkThrowObjects();
    this.checkCoinHarvest();
    this.checkBottleHarvest();
    this.checkHeartHarvest();
  }

  /**
   * Check if character collides with enemy - if yes, execute hit-function and set new bar-image
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isAboveGround() && enemy.energy && !paused) {
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


  //COLLECTING BOTTLES & COINS
  isCollectable(obj) {
    return this.character.isColliding(obj) && obj.width != 0 && obj.height != 0;
  }

  /**
   * Check collision with coins - if yes, play sound and execute collecting-function
   */
  checkCoinHarvest() {
    this.level.coins.forEach((coin) => {
      if (this.isCollectable(coin)) {
        this.collectCoin(coin);
        this.playStoppableSound(this.coinSound, 0.5);
      }
    })
  }


  /**
   * Collecting Coins
   * @param {Object} coin 
   */
  collectCoin(coin) {
    this.statusBarCoin.coins++;
    this.points += 1000;
    this.showAddedPoints(1000);
    coin.removeObject();
  }


  /**
   * Check collision with collectable bottles - if yes, play sound and execute collecting-function
   */
  checkBottleHarvest() {
    this.level.bottles.forEach((bottle) => {
      if (this.isCollectable(bottle)) {
        this.collectBottle(bottle);
        this.playStoppableSound(this.bottleSound, 0.5);
      }
    })
  }


  /**
   * Collecting Bottles
   * @param {Object} bottle 
   */
  collectBottle(bottle) {
    this.statusBarBottle.bottles++;
    this.collectedBottles++;
    this.points += 200;
    this.showAddedPoints(200);
    bottle.removeObject();
  }


  /**
   * Check collision with collectable hearts - if yes, play sound and execute collecting-function
   */
  checkHeartHarvest() {
    this.level.hearts.forEach((heart) => {
      if (this.isCollectable(heart)) {
        this.collectHeart(heart);
        this.playStoppableSound(this.bottleSound, 0.5);
      }
    })
  }


  /**
   * Collecting Hearts
   * @param {Object} heart 
   */
  collectHeart(heart) {
    this.character.hearts++;
    this.character.healCharacter();
    this.points += 200;
    this.showAddedPoints(200);
    heart.removeObject();
  }




  //THROW BOTTLES
  /**
   * Creates throwable Bottles and put them in an array
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.statusBarBottle.bottles) {
      setTimeout(() => { this.shootable = true; }, 500);
      this.addBottle();
    }
  }


  /**
   * Add bottle to array
   */
  addBottle() {
    if (this.shootable) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.checkBottleDirection(bottle);
      this.statusBarBottle.bottles--;
      this.throwableObjects.push(bottle);
      this.shootable = false;
      this.character.resetIdleCount();
    }
  }


  /**
   * Check direction of bottle
   * @param {Object} bottle 
   */
  checkBottleDirection(bottle) {
    if (this.character.otherDirection) {
      bottle.speedX *= -1;
      bottle.x = this.character.x;
    }
  }


  /**
 * Check if throwed bottle hits enemy
 */
  checkCollisionBottle() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((bottle) => {
        if (bottle.isColliding(enemy) && !bottle.splashed) {
          this.hitEnemyWithBottle(enemy, bottle);
        }
      })
    })
  }


  /**
   * Hit Enemy with Bottle
   * @param {Object} enemy 
   * @param {Object} bottle 
   */
  hitEnemyWithBottle(enemy, bottle) {
    enemy.hit();
    this.getPoints(enemy);
    bottle.enemyHit = true;
    if (enemy instanceof Endboss) {
      this.statusBarEndboss.setPercentage(enemy.energy);
    }
  }


  /**
   * Increase point-counter by type of enemy
   * @param {Object} enemy 
   */
  getPoints(enemy) {
    let amount = 0;
    if (enemy instanceof Chicken) {
      amount = +300;
      this.killedChicken++;
    } else if (enemy instanceof ChickenSmall) {
      amount = +500;
      this.killedSmallChicken++;
    } else if (enemy instanceof Endboss) {
      amount = +1500;
    }
    this.showAddedPoints(amount);
    this.points += amount;
  }


  //MUSIC & SOUND FUNCTIONS

  controllAllSounds() {
    this.checkMute();
    this.checkPaused();
    this.fadeMusic();
  }

  /**
   * Check if sound is muted
   */
  checkMute() {
    if (mutedMusic) {
      this.pauseMusic(this.levelMusic);
    } else {
      this.playMusic(this.levelMusic, 1);
      this.fadeMusic();
    }
  }


  /**
   * Pause audio-file
   * @param {Audio} sound 
   */
  pauseMusic(sound) {
    sound.pause();
    // sound.volume = 0;
  }



  /**
   * Play audio-file by given volume
   * @param {Audio} sound 
   * @param {number} volume 
   */
  playMusic(sound, volume) {
      sound.play();
      sound.volume = volume;
  }


  /**
   * Stoppable Sounds
   * @param {Audio} sound 
   * @param {number} volume 
   */
  playStoppableSound(sound, volume) {
    if (!mutedSounds) {
      sound.play();
      sound.volume = volume;
    } else {
      this.pauseMusic(sound);
    }
  }


  /**
   * Pause Sounds if game paused
   */
  checkPaused() {
    if (paused) {
      this.pauseMusic(this.levelMusic);
      this.pauseMusic(this.endbossMusic);
    } else {
      this.fadeMusic();
    }
  }


  /**
   * Mute running music
   */
  muteComplete() {
    this.pauseMusic(this.levelMusic);
    this.pauseMusic(this.endbossMusic);
    this.pauseMusic(this.character.walking_sound);
    this.pauseMusic(this.character.hurt_sound);
    this.pauseMusic(this.character.jump_sound);
  }


  //CONTROLLING BALANCE BETWEEN LEVEL AND ENDBOSS-MUSIC

  /**
   * Fade Music
   */
  fadeMusic() {
    let dis = this.endboss.distanceTo(this.character);
    this.fadeInMusic(dis);
    this.fadeOutLevelMusic(dis);
  }


  /**
   * Fade in Boss-Music by checking distance to character
   * @param {number} dis 
   */
  fadeInMusic(dis) {
    if (mutedMusic || this.gameover || dis > 1200 || this.endboss.isDead()) {
      this.endbossMusic.volume = 0;
    } else {
      this.fadeInEndbossMusic(dis);
    }
  }


  /**
   * Set Volume for Endboss-Music
   * @param {number} dis 
   */
  fadeInEndbossMusic(dis) {
    if (dis < 1200 && dis > 500 && !paused) {
      let vol = (1200 - dis) / 700;
      this.playMusic(this.endbossMusic, vol);
    } else if (dis < 500 && !paused) {
      this.playMusic(this.endbossMusic, 1);
    }
  }


  /**
   * Fade Out Level Music
   */
  fadeOutLevelMusic(dis) {
    if (dis < 1500 && dis > 800) {
      let vol = 1 - (1500 - dis) / 700;
      this.levelMusic.volume = vol;
    } else if (dis < 800) {
      this.levelMusic.volume = 0;
    }
  }


  //DRAWING FUNCTIONS
  /**
   * Drawing elements on canvas-context
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawMovableElements();
    this.drawStaticElements();
    this.drawCollectableElements();
    //requestAnimation Funktion kennt kein 'this' - die Funktion wird abh??ngig von Grafikleistung wiederholt aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * Draw Static Elements
   */
  drawStaticElements() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarEndboss);
  }


  /**
   * Draw Collectable Elements
   */
  drawCollectableElements() {
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.ctx.font = '32px Arial';
    this.drawCounters();
    this.drawPoints();
    this.drawAddedPoints();
  }


  /**
   * Draw Counter Elements
   */
  drawCounters() {
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(' x ' + this.statusBarCoin.coins, this.statusBarCoin.width + this.statusBarCoin.x, this.statusBarCoin.y + 32);
    this.ctx.fillText(' x ' + this.statusBarBottle.bottles, this.statusBarBottle.width + this.statusBarBottle.x, this.statusBarBottle.y + 45);
  }


  /**
   * Draw Point Count
   */
  drawPoints() {
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = 'gold';
    this.ctx.fillText(this.points, 705, this.statusBarBottle.y + 45);
  }


  /**
   * Draw Added Points
   */
  drawAddedPoints() {
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = 'lime';
    this.ctx.fillText(this.addedPoints, 705, this.statusBarBottle.y + 75);
  }


  /**
   * Draw Movable Elements
   */
  drawMovableElements() {
    this.ctx.translate(this.camera_x, 0);
    this.drawBackgroundElements();
    this.drawFrontElements();
    this.ctx.translate(-this.camera_x, 0);
  }


  /**
   * Draw Background Elements
   */
  drawBackgroundElements() {
    //Background Elements
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }


  /**
   * Draw Front Elements
   */
  drawFrontElements() {
    //Front Elements
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.hearts);
    this.addObjectsToMap(this.throwableObjects);
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
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
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
    mo.x = mo.x * -1; //x-value gets turned
  }


  /**
   * Mirrors images back
   * @param {Movable Object} mo 
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore(); //x-value gets turned again
  }


  /**
   * Display added game points
   * @param {number} amount 
   */
  showAddedPoints(amount) {
    this.addedPoints += `+${amount}  `;
    setTimeout(() => {
      this.addedPoints = '';
    }, 1000);
  }


  /**
   * Stopp current game run
   * @param {string} end 
   */
  stopGame(end) {
    intervalIds.forEach(clearInterval);
    this.muteComplete();
    if (end == 'loose' && !this.gameover) {
      this.looseGame();
    } else if (end == 'win' && !this.gameover) {
      this.winGame();
    }
  }


  /**
   * Initialize loosing game
   */
  looseGame() {
    this.playStoppableSound(this.character.die_sound, 0.4);
    this.gameover = true;
    setTimeout(() => {
      this.showEndscreen('loose');
      this.playMusic(this.loose, 0.5);
    }, 1000)
  }


  /**
   * Initialize winning game
   */
  winGame() {
    setTimeout(() => {
      this.endboss.killEndboss();
      this.gameover = true;
      this.playMusic(this.win, 0.4);
    }, 1000);
    setTimeout(() => {
      this.showEndscreen('win');
    }, 2500)
  }


  showEndscreen(end) {
    document.getElementById('end-screen').style.left = '0';
    this.showResults(end);
    setTimeout(() => {
      document.getElementById('end-screen-content').style.display = 'flex';
    }, 2000)
  }


  showResults(end) {
    if (end == 'win') {
      document.getElementById('winner-display').style.color = `rgb(109, 255, 141)`;
      document.getElementById('winner-display').innerHTML = 'You win!';
    }
    document.getElementById('endgame-coins').innerHTML = `${this.statusBarCoin.coins} x 1000`;
    document.getElementById('endgame-bottles').innerHTML = `${this.statusBarBottle.bottles} x 200`;
    document.getElementById('endgame-totalkill').innerHTML = `${this.killedChicken + this.killedSmallChicken + this.killedEndboss}`;
    document.getElementById('killed-chicken').innerHTML = `${this.killedChicken} x 300`;
    document.getElementById('killed-small-chicken').innerHTML = `${this.killedSmallChicken} x 500`;
    document.getElementById('killed-endboss').innerHTML = `${this.killedEndboss} x 7500`;
    document.getElementById('endgame-points').innerHTML = `${this.points - this.collectedBottles * 200 + this.statusBarBottle.bottles * 200}`;
  }
}



