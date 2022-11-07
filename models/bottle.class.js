class Bottle extends MovableObject {
    height = 60;
    width = 50;


    constructor() {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');

        this.y = 120 + Math.random()*200;
        this.x = 200 + Math.random()*1800;
    }
}