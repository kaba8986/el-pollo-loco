let levelLength = 5;
let level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new Endboss()
    ],
    [
      new Cloud()
    ],
    [
      new BackgroundObject('./img/5_background/layers/air.png', -719),
      new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),
  
      new BackgroundObject('./img/5_background/layers/air.png', 0),
      new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
      
      new BackgroundObject('./img/5_background/layers/air.png', 719),
      new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),

      new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
      new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
      new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
      new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),

      new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
      new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
      new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
      new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),

      new BackgroundObject('./img/5_background/layers/air.png', 719 * 4),
      new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 4),
      new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 4),
      new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 4),

      new BackgroundObject('./img/5_background/layers/air.png', 719 * 5),
      new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 5),
      new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 5),
      new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 5),

      new BackgroundObject('./img/5_background/layers/air.png', 719 * 6),
      new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 6),
      new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 6),
      new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 6)
    ],

    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin()
    ],

    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle()
    ]
  )

  /*
  this.addBackgroundObjects(this.levelLength);

  function addBackgroundObjects(length) {
    for(let i = 0; i < length; i++) {
      let bg = new BackgroundObject('./img/5_background/layers/air.png', (i+1)*719);
      this.level1[2].push(bg);
    }

  }
  */