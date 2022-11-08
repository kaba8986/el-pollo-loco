class Bottle extends MovableObject {
    height = 60;
    width = 50;

    IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage(this.randomizeDirection());

        this.y = 370;
        this.x = 200 + Math.random()*1800;
        //this.distanceToNext();
    }

    randomizeDirection() {
        let random = Math.round(Math.random());
        return this.IMAGES[random];
    }


}