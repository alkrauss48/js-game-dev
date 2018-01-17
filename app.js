var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;

var dx = 2;
var dy = -2;

var ballColor = 0;

function drawBall(changeColor) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);

  if(changeColor) {
    ballColor += 20;
    if( ballColor > 360 ) {
      ballColor = 0;
    }
  }

  ctx.fillStyle = "hsl(" + ballColor + ", 100%, 50%)";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  x += dx;
  y += dy;

  if( x + dx > canvas.width - ballRadius || x + dx < ballRadius ) {
    drawBall(true);
    dx = -dx;
  }

  if( y + dy > canvas.height - ballRadius || y + dy < ballRadius ) {
    drawBall(true);
    dy = -dy;
  }

  requestAnimationFrame(draw);
}

draw();
