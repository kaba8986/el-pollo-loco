let level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new Endboss()
    ],
    [
      new Cloud(200, 50),
      new Cloud(800, 80),
      new Cloud(1900, 70),
      new Cloud(2500, 50),
      new Cloud(3500, 80),
      new Cloud(4200, 80),
      new Cloud(4900, 80),
      new Cloud(5600, 50),
      new Cloud(6600, 70)
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
      new Coin(500, 190),
      new Coin(500, 250),
      new Coin(1200, 130),
      new Coin(1260, 130),
      new Coin(1320, 130),
      new Coin(1800, 280),
      new Coin(1860, 280),
      new Coin(2200, 150),
      new Coin(2600, 300),
      new Coin(2660, 300),
      new Coin(2720, 300),
      new Coin(3400, 300),
      new Coin(3460, 240),
      new Coin(3520, 180),
      new Coin(3580, 180),
      new Coin(3640, 240),
      new Coin(3700, 300)
    ],

    [
      new Bottle(600, 370, 0),
      new Bottle(1100, 370, 0),
      new Bottle(1130, 370, 1),
      new Bottle(1600, 370, 0),
      new Bottle(2360, 370, 0),
      new Bottle(2390, 370, 1),
      new Bottle(2450, 370, 0),
      new Bottle(2900, 370, 1),
      new Bottle(3100, 370, 0),
      new Bottle(3400, 370, 0),
      new Bottle(3440, 370, 1)
    ],

    [
      new Heart(1000, 160),
      new Heart(1800, 220),
      new Heart(3000, 200),
      new Heart(3550, 280)
    ]
  )

