class Coin extends MovableObject {

    width = 120;
    height = 120;

    IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        
        this.y = 120 + Math.random()*200;
        this.x = 200 + Math.random()*1800;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400)
    }

    
}