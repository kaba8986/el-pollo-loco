class Character extends MovableObject {

  height = 280;
  y = 160;
  speed = 10;
  idleCount = 0;

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

  ITEMS_IDLE = [
    './img/2_character_pepe/1_idle/idle/I-1.png',
    './img/2_character_pepe/1_idle/idle/I-2.png',
    './img/2_character_pepe/1_idle/idle/I-3.png',
    './img/2_character_pepe/1_idle/idle/I-4.png',
    './img/2_character_pepe/1_idle/idle/I-5.png',
    './img/2_character_pepe/1_idle/idle/I-6.png',
    './img/2_character_pepe/1_idle/idle/I-7.png',
    './img/2_character_pepe/1_idle/idle/I-8.png',
    './img/2_character_pepe/1_idle/idle/I-9.png',
    './img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  ITEMS_IDLE_LONG = [
    './img/2_character_pepe/1_idle/long_idle/I-11.png',
    './img/2_character_pepe/1_idle/long_idle/I-12.png',
    './img/2_character_pepe/1_idle/long_idle/I-13.png',
    './img/2_character_pepe/1_idle/long_idle/I-14.png',
    './img/2_character_pepe/1_idle/long_idle/I-15.png',
    './img/2_character_pepe/1_idle/long_idle/I-16.png',
    './img/2_character_pepe/1_idle/long_idle/I-17.png',
    './img/2_character_pepe/1_idle/long_idle/I-18.png',
    './img/2_character_pepe/1_idle/long_idle/I-19.png',
    './img/2_character_pepe/1_idle/long_idle/I-20.png'
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

  IMAGE_END = './img/2_character_pepe/5_dead/D-57.png';


  IMAGES_HURT = [
    './img/2_character_pepe/4_hurt/H-41.png',
    './img/2_character_pepe/4_hurt/H-42.png',
    './img/2_character_pepe/4_hurt/H-43.png'
  ];


  world;
  walking_sound = new Audio('./audio/walking.mp3');
  snoring_sound = new Audio('./audio/snoring.mp3');
  hurt_sound = new Audio('./audio/hurt.mp3');
  jump_sound = new Audio('./audio/jump.mp3');
  die_sound = new Audio('./audio/dying.mp3');
  hearts = 0;


  constructor() {
    super().loadImage('./img/2_character_pepe/2_walk/W-21.png'),
      this.loadTotalImages();
    this.applyGravity();
    this.animate();
  }

  loadTotalImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.ITEMS_IDLE);
    this.loadImages(this.ITEMS_IDLE_LONG);
  }


  /**
   * Animate Character
   */
  animate() {
    setInterval(() => { this.increaseIdleCount(); }, 1000); //Idle-Counter
    setStoppableInterval(() => { this.checkIfMoving(); }, 1000 / 60); //Play Moving Sounds and set Actions
    setStoppableInterval(() => { this.playCharacterAnimations(); }, 100); //Show Images  
  }


  /**
   * Move Character
   */
  checkIfMoving() {
    if (!paused) {
      world.pauseMusic(this.walking_sound);
      this.moveCharacterRight();
      this.moveCharacterLeft();
      this.letCharacterJump();
    }
    this.world.camera_x = -this.x + 100;
  }


  /**
   * Play Animations
   */
  playCharacterAnimations() {
    if (!paused) {
      this.checkIfCharacterRests();
      if (this.isDead()) {
        this.playAnimationDead();
      } else if (this.isHurt()) {
        this.playAnimationHurt();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }


  /**
   * Checks if character rests and execute animations
   */
  checkIfCharacterRests() {
    if (this.isAsleep()) {
      this.playAnimation(this.ITEMS_IDLE_LONG);
      world.playStoppableSound(this.snoring_sound, 1);
    } else if (this.isNodding()) {
      this.playAnimation(this.ITEMS_IDLE);
    } else {
      world.pauseMusic(this.snoring_sound);
    }
  }


  //Moving Right
  moveCharacterRight() {
    if (this.world.keyboard.RIGHT && this.distanceTo(world.endboss) < 50 && !this.isDead()) {
      this.moveRight();
      world.playStoppableSound(this.walking_sound, 0.5);
      this.resetIdleCount();
    }
  }

  //Moving Left
  moveCharacterLeft() {
    if (this.world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
      this.moveLeft();
      this.otherDirection = true;
      world.playStoppableSound(this.walking_sound, 0.5);
      this.resetIdleCount();
    }
  }


  //Jump
  letCharacterJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDead()) {
      this.jump();
      world.playStoppableSound(this.jump_sound, 0.5);
      this.resetIdleCount();
    }
  }


  /** ANIMATIONS DEAD & HURT **/

  //Play Animation for Dead
  playAnimationDead() {
    this.playAnimation(this.IMAGES_DEAD);
    world.stopGame('loose');
    this.dieCharacter();
  }


  //Play Animation for getting Hurt
  playAnimationHurt() {
    this.playAnimation(this.IMAGES_HURT);
    world.playStoppableSound(this.hurt_sound, 0.7);
  }


  /** CHECKING IDLE FUNCTIONS **/

  //Update IdleCount
  increaseIdleCount() {
    if (!paused) {
      this.idleCount++;
    }
  }


  //Reset IdleCount
  resetIdleCount() {
    this.idleCount = 0;
  }


  //Check if Character is nodding
  isNodding() {
    return this.idleCount > 5;
  }


  //Check if Character fell asleep
  isAsleep() {
    return this.idleCount > 8;
  }


  //Heal Character
  healCharacter() {
    this.energy += 20;
    if (this.energy > 100) {
      this.energy = 100;
    }
    world.statusBarHealth.setPercentage(this.energy);
  }
}