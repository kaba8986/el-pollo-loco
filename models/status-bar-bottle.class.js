class StatusBarBottle extends DrawableObject {

  IMAGES = [
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 480;
    this.y = 10;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  //set Percentage
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 5
    let path = this.IMAGES[5];
    this.img = this.imageCache[path];
  }
}