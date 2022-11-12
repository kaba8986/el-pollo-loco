class Bottle extends MovableObject {
    height = 60;
    width = 50;
    splash = false;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

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