class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {

    let img = new Image();
    img.src = path;
    this.imageCache[path] = img;
  });
  }

  moveRight() {
    console.log('moving right');
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