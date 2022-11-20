class ThrowableObject extends MovableObject {
  speedX = 10;
  speedY = 30;
  splashed = false;
  enemyHit = false;
  throwing_sound = new Audio('./audio/throw_bottle.mp3');
  splash_sound = new Audio('audio/glass.mp3')

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
}

  IMAGES_ROTATE = [
    './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  IMAGES_SPLASH = [
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
  ];

  constructor(x, y) {
    super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
    this.checkSplash();
  }

  
  throw() {
    world.playSound(this.throwing_sound, 0.4);
    this.speedY = 20; 
    if(!this.splashed) {
      this.applyGravity();
    }

    setInterval(() => {
      if(this.isAboveGround()) {
        this.x += this.speedX;
      }
    }, 25);
  }


  /**
   * Checks if either bottle hits enemy or ground
   * @returns boolean
   */
  checkSplash() {
    setInterval(() => {
      if(!this.isAboveGround() || this.enemyHit) {
        if(this.splashed) {
          this.width = 0;
          this.height = 0;
          this.loadImage('./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png');
        } else {
          world.playSound(this.splash_sound, 1);
          this.playAnimation(this.IMAGES_SPLASH); 
          this.splashed = true; //plays splash-imgs only once 
        }
      } else {
        this.playAnimation(this.IMAGES_ROTATE);
      }
    }, 100)
  }

}