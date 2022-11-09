class Chicken extends MovableObject {

  y = 360;
  height = 60;
  width = 80;
  
  
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

    this.x = 200 + Math.random() * 500; //Zahl zwischen 200 und 500
    this.speed = 0.15 + Math.random()*0.25;

    this.animate();
  }

  animate() {
    //Hühner laufen

    setInterval(()=> {
      if(!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    //Bilder wechseln
    setInterval(() => {
      if(this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.width = 0;
          this.height = 0;
        }, 1500);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100)
  }
}