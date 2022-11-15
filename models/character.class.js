class Character extends MovableObject {

  height = 280;
  y = 160;
  speed = 10;

  offset = {
    top: 110,
    right: 20,
    bottom: 15,
    left: 20
}

  IMAGES_WALKING = [
    './img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png'
  ];

  IMAGES_JUMPING = [
    './img/2_character_pepe/3_jump/J-31.png',
    './img/2_character_pepe/3_jump/J-32.png',
    './img/2_character_pepe/3_jump/J-33.png',
    './img/2_character_pepe/3_jump/J-34.png',
    './img/2_character_pepe/3_jump/J-35.png',
    './img/2_character_pepe/3_jump/J-36.png',
    './img/2_character_pepe/3_jump/J-37.png',
    './img/2_character_pepe/3_jump/J-38.png',
    './img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    './img/2_character_pepe/5_dead/D-51.png',
    './img/2_character_pepe/5_dead/D-52.png',
    './img/2_character_pepe/5_dead/D-53.png',
    './img/2_character_pepe/5_dead/D-54.png',
    './img/2_character_pepe/5_dead/D-55.png',
    './img/2_character_pepe/5_dead/D-56.png',
    './img/2_character_pepe/5_dead/D-57.png',
  ];


  IMAGES_HURT = [
    './img/2_character_pepe/4_hurt/H-41.png',
    './img/2_character_pepe/4_hurt/H-42.png',
    './img/2_character_pepe/4_hurt/H-43.png'
  ];


  world;
  walking_sound = new Audio('audio/walking.mp3');
  hurt_sound = new Audio('./audio/hurt.mp3');
  jump_sound = new Audio('./audio/jump.mp3');

  constructor() {
    super().loadImage('./img/2_character_pepe/2_walk/W-21.png'),
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_JUMPING);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }



  animate() {

    setStoppableInterval(() => {
      world.pauseSound(this.walking_sound); 
      if (this.world.keyboard.RIGHT && this.distanceTo(world.endboss) < 50 && !this.isDead()) {
        this.moveRight();
        world.playSound(this.walking_sound, 0.5);
      }

      if (this.world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
        this.moveLeft();
        this.otherDirection = true;
        world.playSound(this.walking_sound, 0.5);
      }


      if(this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDead()) {
        this.jump();
        world.playSound(this.jump_sound, 0.5);
      }

      this.world.camera_x = -this.x + 100;


    }, 1000 / 60);

    
    setStoppableInterval(() => {
      console.log('character');
    }, 1000);


    setStoppableInterval(() => {


      if(this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        intervalIds.forEach(clearInterval);
        // this.dieCharacter();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        world.playSound(this.hurt_sound, 0.7);
      }
       else if(this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {

        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }

      }
    }, 50);

  }

}