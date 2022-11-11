class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 110,
        right: 20,
        bottom: 15,
        left: 20
    }
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall|| this instanceof Endboss || this instanceof ThrowableObject) {
          ctx.beginPath();
          ctx.lineWidth = '3';
          ctx.strokeStyle = 'blue';
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();
        }
      }

    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }


    loadImages(arr) {
        arr.forEach((path) => {

            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}