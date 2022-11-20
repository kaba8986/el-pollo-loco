class Endboss extends MovableObject {

  height = 400;
  width = 250;
  y = 50;
  isWalking = false;
  energy = 125;
  speed = 25;

  offset = {
    top: 60,
    right: 20,
    bottom: 15,
    left: 20
}

  endboss_music = new Audio('./audio/endboss.mp3');
  falling = new Audio('./audio/falling.mp3')


  IMAGES_WALKING = [
    './img/4_enemie_boss_chicken/1_walk/G1.png', 
    './img/4_enemie_boss_chicken/1_walk/G2.png', 
    './img/4_enemie_boss_chicken/1_walk/G3.png'
  ];

  IMAGES_ALERT = [
    './img/4_enemie_boss_chicken/2_alert/G5.png',
    './img/4_enemie_boss_chicken/2_alert/G6.png',
    './img/4_enemie_boss_chicken/2_alert/G7.png',
    './img/4_enemie_boss_chicken/2_alert/G8.png',
    './img/4_enemie_boss_chicken/2_alert/G9.png',
    './img/4_enemie_boss_chicken/2_alert/G10.png',
    './img/4_enemie_boss_chicken/2_alert/G11.png',
    './img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  IMAGES_ATTACK = [
    './img/4_enemie_boss_chicken/3_attack/G13.png',
    './img/4_enemie_boss_chicken/3_attack/G14.png',
    './img/4_enemie_boss_chicken/3_attack/G15.png',
    './img/4_enemie_boss_chicken/3_attack/G16.png',
    './img/4_enemie_boss_chicken/3_attack/G17.png',
    './img/4_enemie_boss_chicken/3_attack/G18.png',
    './img/4_enemie_boss_chicken/3_attack/G19.png',
    './img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  IMAGES_HURT = [
    './img/4_enemie_boss_chicken/4_hurt/G21.png',
    './img/4_enemie_boss_chicken/4_hurt/G22.png',
    './img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];

  IMAGES_DEAD = [
    './img/4_enemie_boss_chicken/5_dead/G24.png',
    './img/4_enemie_boss_chicken/5_dead/G25.png',
    './img/4_enemie_boss_chicken/5_dead/G26.png'
  ];

  killed = 0;
  

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0])
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 4000;

    this.animate();
  }


  animate() {
    setInterval(() => {
      if(!paused) {
        if(this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.energy <= 100 && this.distanceTo(world.character) > 0 && !this.isDead()) {
          this.playAnimation(this.IMAGES_WALKING);
          this.moveLeft();
        } else if(!this.energy && !this.dead) {
          this.dieEndboss();
          this.playAnimation(this.IMAGES_DEAD);
          this.dead = true;
        } else if (this.dead) {
          this.img.src = './img/4_enemie_boss_chicken/5_dead/G27.png';
          world.stopGame('win');
        } else {
          this.playAnimation(this.IMAGES_ALERT);  
        }
      }
    }, 150) 
  }

}