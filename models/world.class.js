class World {
  character = new Character();
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld()
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);


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
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      //X-Koordinate muss negiert werdern weil jetzt von rechts gezählt wird
      mo.x = mo.x * -1;
    }

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    //Bilder spiegeln wenn Character nach links läuft
    if(mo.otherDirection) {
      //X-Koordinate wird wieder negiert
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}