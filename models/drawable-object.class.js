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
    

    /**
     * Set img-path
     * @param {String} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Draw Image on canvas-context
     * @param {String} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Draw Object Border for (collision control only)
     * @param {string} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall|| this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coin) {
          ctx.beginPath();
          ctx.lineWidth = '3';
          ctx.strokeStyle = 'blue';
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();
        }
      }


    /**
     * Load images in cache
     * @param {Array} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}