var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload,
  create: create,
  update: update
});

var ball;
var paddle;
var bricks;
var newBricks;
var score = 0;
var scoreText;
var killCount = 0;

var brickInfo = {
  width: 50,
  height: 20,
  count: {
    row: 7,
    col: 3
  },
  offset: {
    top: 50,
    left: 60
  },
  padding: 10
};

function initBricks() {
  bricks = game.add.group();
  for( var c = 0; c < brickInfo.count.col; c++ ) {
    for( var r = 0; r < brickInfo.count.row; r++ ) {
      var brickX = (r * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
      var brickY = (c * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
      newBrick = game.add.sprite(brickX, brickY, 'brick');
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(.5);
      bricks.add(newBrick);
    }
  }
}

function ballHitBrick(ball, brick) {
  brick.kill();
  score += 10;
  scoreText.setText('Points: ' + score);

  // Set victory conditions
  killCount++;
  if (killCount === bricks.children.length) {
    alert('You won the game, congratulations!');
    location.reload();
  }
}

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';
  game.load.image('ball', 'img/ball.png');
  game.load.image('paddle', 'img/paddle.png');
  game.load.image('brick', 'img/brick.png');
}

function create() {
  // Enable physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Add sprites
  ball = game.add.sprite(game.world.width * .5, game.world.height - 25, 'ball');
  paddle = game.add.sprite(game.world.width * .5, game.world.height - 5, 'paddle');
  initBricks();

  // Physics config
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;

  // Ball config
  ball.body.collideWorldBounds = true;
  ball.body.velocity.set(150, -150);
  ball.body.bounce.set(1);
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add( function() {
    alert('Game Over!');
    location.reload();
  });

  // Paddle config
  paddle.anchor.set(.5, 1);
  paddle.body.immovable = true;

  // Score config
  scoreText = game.add.text(5, 5, 'Points: ' + score, { font: '18px Arial', fill: '#0095DD' });
}

function update() {
  game.physics.arcade.collide(ball, paddle);
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  paddle.x = game.input.x || game.world.width * .5;
}
