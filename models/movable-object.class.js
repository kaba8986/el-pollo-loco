class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25)
  }

  isAboveGround() {
    if ((this instanceof ThrowableObject)) { // Throwable Object should ALWAYS fall
      return true;
    }
    return this.y < 160;
  }




  //Formel zur Kollisionsberechnung - z.B. character.isCollidiing(chicken)

  isColliding(obj) {
    /*
    return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
      (this.Y + this.offsetY + this.height) >= obj.Y &&
      (this.Y + this.offsetY) <= (obj.Y + obj.height);
    */
    return this.x + this.width > obj.x &&
      this.y + this.height > obj.y &&
      this.x < obj.x &&
      this.y < obj.y + obj.height;
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in ms
    return timePassed < 1000;
  }


  isDead() {
    return this.energy == 0;
  }



  playAnimation(images) {
    //Walk animation - Bilder durchiterieren
    let i = this.currentImage % images.length;
    //i liefert 0, 1, 2, 3, 4, 5, 0, 1, 2 .... Endlosschleife
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}