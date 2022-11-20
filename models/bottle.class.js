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

    constructor(x,y, dir) {
        super().loadImage(this.setDirection(dir));

        this.x = x;
        this.y = y;
    }

    /**
     * Set direction of Bottle - Choose between two images
     * @param {number} dir 
     * @returns boolean
     */
    setDirection(dir) {
        return dir == 0 ? this.IMAGES[0] : this.IMAGES[1];
    }
}