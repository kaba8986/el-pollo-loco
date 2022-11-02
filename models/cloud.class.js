class Cloud extends MovableObject {
  y = 50;
  width = 300;
  height = 400;

  constructor() {
    super().loadImage('./img/5_background/layers/4_clouds/1.png');

    this.x = Math.random()*700; //Zahl zwischen 200 und 500
  }
}