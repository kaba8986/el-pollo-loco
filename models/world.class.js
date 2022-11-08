class World {
  character = new Character();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  throwableObjects = [];
  coinCounter = 0;
  bottleCounter = 0;
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  coinSound = new Audio('./audio/coin.mp3');
  bottleSound = new Audio('./audio/bottle.mp3');

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
      this.checkCoinCollision();
      this.checkThrowObjects();
    }, 200);
  }


  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if(this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      } 
    })
  }


  checkCoinCollision() {
    this.level.coins.forEach((coin) => {
      if(this.character.isColliding(coin) && coin.width != 0 && coin.height != 0) {
        this.collectCoin(coin);
        this.statusBarCoin.setPercentage(this.coinCounter);
        this.coinSound.play();
      }
    })
  }


  collectCoin(coin) {
    console.log('Counter before: ' + this.coinCounter);
    if (this.coinCounter < 5) {
      this.coinCounter++;
    }
    coin.width = 0;
    coin.height = 0;
    console.log('Counter after: ' + this.coinCounter);
  }






  checkThrowObjects() {
    if(this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

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

  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    })
  }

  addToMap(mo) {
    //Bilder spiegeln wenn Character nach links läuft
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);


    //Bilder spiegeln wenn Character nach links läuft
    if(mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    //X-Koordinate muss negiert werdern weil jetzt von rechts gezählt wird
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    //X-Koordinate wird wieder negiert
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}


