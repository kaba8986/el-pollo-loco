class Cloud extends MovableObject {
  y = 50;
  width = 400;
  height = 300;

  constructor(x, y) {
    super().loadImage('./img/5_background/layers/4_clouds/1.png');

    this.width = 370 + Math.random()*150;
    this.height = 270 + Math.random()*150;
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000/60);
  }

}