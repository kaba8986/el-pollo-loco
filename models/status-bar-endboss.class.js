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
    // this.showBar();
  }

  showBar() {
    setInterval(() => {
      if(world.endboss.distanceTo(world.character) < 800) {
        document.getElementById('total-bottles').style.top = '30%';
        this.width = 180;
      } else {
        document.getElementById('total-bottles').style.top = '12%';
        this.width = 0;
      }
    }, 200);
  }

  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 2
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

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