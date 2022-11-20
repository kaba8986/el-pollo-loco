class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;
  dead = false;


  /**
   * Simulates Gravity
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25)
  }


  /**
   * Checks if Object is above Ground
   * @returns boolean
   */
  isAboveGround() {
    if ((this instanceof ThrowableObject)) { // Throwable Object should ALWAYS fall
      return this.y < 360;
    }
    return this.y < 160;
  }


  /**
   * Checks if objects are colliding
   * @param {Object} obj 
   * @returns boolean
   */
  isColliding(obj) {
    return this.rightBorder() > obj.leftBorder() &&
      this.bottomBorder() > obj.topBorder() &&
      this.leftBorder() < obj.rightBorder() &&
      this.topBorder() < obj.bottomBorder();
  }


  /**
   * Creates Top Border of Object
   * @returns number
   */
  topBorder() {
    return this.y + this.offset.top;
  }


  /**
   * Creates Right Border of Object
   * @returns number
   */
  rightBorder() {
    return this.x + this.width - this.offset.right;
  }


  /**
   * Creates Bottom Border of Object
   * @returns number
   */
  bottomBorder() {
    return this.y + this.height - this.offset.bottom;
  }


  /**
   * Creates Left Border of Object
   * @returns number
   */
  leftBorder() {
    return this.x + this.offset.left;
  }


  /**
   * Hits Object and reduces energy
   */
  hit() {
    if (this instanceof Character) {
      this.energy -= 2;
      this.resetIdleCount();
    } else {
      this.energy -= 25;
    }
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  /**
   * Moves Object out of screen
   */
  dieCharacter() {
    setInterval(() => {
      this.y += 10;
    }, 50);
  }


  /**
   * Checks distance to last hit
   * @returns boolean
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in ms
    return timePassed < 1000;
  }


  /**
   * Checks if Object is dead
   * @returns boolean
   */
  isDead() {
    return this.energy == 0;
  }


  /**
   * Copys images from array into cache
   * @param {Array} images 
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * Move Object right
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }


  /**
   * Move Object left
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * Let Object jump
   */
  jump() {
    this.speedY = 30;
  }


  /**
   * Minimalizes Object
   */
  removeObject() {
    this.width = 0;
    this.height = 0;
  }


  /**
   * Returns distance between two Objects
   * @param {Object} obj 
   * @returns number
   */
  distanceTo(obj) {
    return this.x - obj.x;
  }


  /**
   * Check if Chicken is alive - if yes, let chicken walk, if not, let chicken die
   */
  checkIfIsAlive() {
    if (this.isDead() && !this.played) {
      this.playAnimationDead();
    } else {
      this.playAnimation(this.IMAGES_WALKING);
      this.moveChickenLeft();
    }
  }


/**
 * Minimalizes Object
 */
  removeEnemy() {
    setTimeout(() => {
      this.played = true;
      this.width = 0;
      this.height = 0;
    }, 1500);
  }
}