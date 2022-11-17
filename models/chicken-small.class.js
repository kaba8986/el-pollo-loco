class ChickenSmall extends MovableObject {

    y = 390;
    height = 30;
    width = 40;
    energy = 25;
    kill_sound = new Audio('./audio/chicken_kill.mp3');
    played = false;

    offset = {
      top: 0,
      right: -20,
      bottom: 0,
      left: -20
  }

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 3800; 
        this.speed = 0.15 + Math.random()*1.2;
    
        this.animate();
    }


    animate() {
        //Move Chicken
        setStoppableInterval(()=> {
          if(!paused) {
            if(!this.isDead()) {
              this.moveLeft();
            }
          }
        }, 1000 / 60);
    
        //Show images
        setStoppableInterval(() => {
          if(!paused) {
            if(this.isDead() && !this.played) {
              world.playSound(this.kill_sound, 0.3);
              this.playAnimation(this.IMAGES_DEAD);
              setTimeout(() => {
                this.played = true;
                this.width = 0;
                this.height = 0;
              }, 1500);
            } else {
              this.playAnimation(this.IMAGES_WALKING);
            }
          }
        }, 100)
      }
}