class StatusBarEndboss extends DrawableObject {

  IMAGES = [
    './img/7_statusbars/2_statusbar_endboss/blue.png',
    './img/7_statusbars/2_statusbar_endboss/green.png',
    './img/7_statusbars/2_statusbar_endboss/orange.png'
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 30;
    this.y = 40;
    this.width = 0;
    this.height = 55;
    this.setPercentage(100);
    this.showBar();
  }


  /**
   * Shows and hides EnbossBar when character gets close to Endboss
   */
  showBar() {
    setInterval(() => {
      if(world.endboss.distanceTo(world.character) < 800) {
        this.showEndbossBar();
      } else {
        this.removeEndbossBar();
      }
    }, 200);
  }


  /**
   * Shows EndbossBar
   */
  showEndbossBar() {
    world.statusBarBottle.y = 100;
    world.statusBarCoin.y = 170;
    this.width = 180;
  }

  /**
   * Removes EndbossBar
   */
  removeEndbossBar() {
    this.width = 0;
    world.statusBarBottle.y = 60;
    world.statusBarCoin.y = 130;
  }


  /**
   * Chooes image from image cache
   * @param {number} percentage 
   */
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 2
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }


  /**
   * Returns index by reading percentage
   * @returns number
   */
  resolveImageIndex() {
    if (this.percentage > 80) {
      return 0;
    } else if (this.percentage > 45) {
      return 1;
    } else if (this.percentage >= 0) {
      return 2;
    }
  }
}