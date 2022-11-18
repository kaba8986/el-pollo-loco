class StatusBarCoin extends DrawableObject {

  /*
  IMAGES = [
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',s
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
  ];
*/

IMAGES = [
  './img/8_coin/coin_1.png'
]; 

coins = 0;


  percentage = 0;

  constructor() {
    super().loadImage(this.IMAGES);
    this.x = 35;
    this.y = 130;
    this.width = 40;
    this.height = 40;
    // this.setPercentage(0);
  }

  //set Percentage
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 5
    let path = this.IMAGES[percentage];
    this.img = this.imageCache[path];
  }

}