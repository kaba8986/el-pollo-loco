class Chicken extends MovableObject {

  y = 360;
  height = 60;
  width = 80;
  energy = 25;
  kill_sound = new Audio('./audio/chicken.mp3');
  played = false;
  
  offset = {
    top: 0,
    right: -20,
    bottom: 0,
    left: -20
}
  
  IMAGES_WALKING = [
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  IMAGES_DEAD = [
    './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ]


  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 300 + Math.random() * 2000; 
    this.speed = 0.15 + Math.random()*1.2;

    this.animate();
  }

  animate() {
    //Hühner laufen

    setInterval(()=> {
      if(!this.isDead()) {
          this.moveLeft();
      }
    }, 1000 / 60);

    /*
    setStoppableInterval(() => {
      console.log('chicken');
    }, 1000);
    */


    //Bilder wechseln
    setInterval(() => {
      if(this.isDead() && !this.played) {
        world.playSound(this.kill_sound, 0.5);
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.width = 0;
          this.height = 0;
          this.played = true;
        }, 1500);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100)
  }


}