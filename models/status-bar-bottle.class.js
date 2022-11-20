class StatusBarBottle extends DrawableObject {


  IMAGES = [
    './img/6_salsa_bottle/salsa_bottle.png'
  ];

  bottles = 0;
  percentage = 100;

  constructor() {
    super().loadImage(this.IMAGES);
    this.x = 30;
    this.y = 60;
    this.width = 45;
    this.height = 60;
  }

}