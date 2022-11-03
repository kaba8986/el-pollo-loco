class Cloud extends MovableObject {
  y = 50;
  width = 400;
  height = 300;
  speed = 0.15;

  constructor() {
    super().loadImage('./img/5_background/layers/4_clouds/1.png');

    this.x = Math.random()*700; //Zahl zwischen 200 und 50
    this.animate();
  }

  animate() {
    this.moveLeft();
  }

  moveLeft() {
    setInterval(() => {
      if(this.x <= -400) {
        this.x = 720;
      }
      this.x -= this.speed;
    }, 1000 / 60)
  }
}