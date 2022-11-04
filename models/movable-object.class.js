class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25)
  }

  isAboveGround() {
    return this.y < 160;
  }


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = '3';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
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


  loadImages(arr) {
    arr.forEach((path) => {

      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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