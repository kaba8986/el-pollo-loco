class Heart extends MovableObject {

    width = 50;
    height = 50;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    constructor(x, y) {
        super().loadImage('./img/7_statusbars/3_icons/icon_health.png');
        this.x = x;
        this.y = y;
    }
}