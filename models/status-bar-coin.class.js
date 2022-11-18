class StatusBarCoin extends DrawableObject {


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
  }
}