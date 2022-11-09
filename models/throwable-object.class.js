class ThrowableObject extends MovableObject {
  speedX = 10;
  speedY = 30;
  


  IMAGES_ROTATE = [
    './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ]

  constructor(x, y) {
    super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATE);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 20;
    this.applyGravity();

    setInterval(() => {
        this.x += this.speedX;
    }, 25);

    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATE);
    }, 50);
  }

}