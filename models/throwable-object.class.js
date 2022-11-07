class ThrowableObject extends MovableObject {
  speedX = 20;
  speedY = 30;

  IMAGES = [

  ];

  constructor(x, y) {
    super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25)
  }
}