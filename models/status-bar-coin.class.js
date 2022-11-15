class StatusBarCoin extends DrawableObject {

  IMAGES = [
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 30;
    this.y = 45;
    this.width = 180;
    this.height = 55;
    this.setPercentage(0);
  }

  //set Percentage
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 5
    let path = this.IMAGES[percentage];
    this.img = this.imageCache[path];
  }

}