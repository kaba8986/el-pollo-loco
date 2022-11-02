class Chicken extends MovableObject {

  y = 360;
  height = 60;
  width = 80;

  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

    this.x = 200 + Math.random()*500; //Zahl zwischen 200 und 500
    this.animate();
  }

  animate() {
    setInterval(() => {
      if(this.x <= -120) {
        this.x = 720;
      }
      this.x -= 3;
    }, 1000 / 60)
  }
}