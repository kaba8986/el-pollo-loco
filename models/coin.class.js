class Coin extends MovableObject {

    width = 50;
    height = 50;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        
        /*
        this.y = 120 + Math.random()*200;
        this.x = 200 + Math.random()*1800;
        */

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400)
    }

    
}