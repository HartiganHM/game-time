const swordSound = new Audio('../sounds/sword.wav');
swordSound.volume = 0.08
;

class Ball {
  constructor (x, y, radius, angleStart, angleEnd, counterclockwise) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angleStart = angleStart;
    this.angleEnd = angleEnd;
    this.counterclockwise = counterclockwise;
    this.dx = 0;
    this.dy = 0;
  }

  draw (context) {
    let gradient = context.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 0);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.angleStart, this.angleEnd, this.clockwise);
    gradient.addColorStop(0, '#0DFCFC');
    gradient.addColorStop(1, '#0547fA');
    context.fillStyle = gradient;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#3D3196';
    context.stroke();
    return this;
  }

  reset() {
    this.y = 650;
    this.x = 400;
    this.dy = 0;
    this.dx = 0;
    setTimeout(() => {
      this.dy = -5;
      this.dx = -1;
    }, 4000);
  }

  paddleHit (paddle) {
    let p0 = paddle.x - 15;
    let p20 = paddle.x + (paddle.w * .2);
    let p40 = paddle.x + (paddle.w * .4);
    let p60 = paddle.x + (paddle.w * .6);
    let p80 = paddle.x + (paddle.w * .8);
    let p100 = paddle.x + paddle.w + 15;

    if (this.y + this.radius === paddle.y) {
      if (this.x > p0 && this.x < p20) {
        this.dy = -this.dy;
        this.dx = -5;
        swordSound.play();
      } else if (this.x > p20 && this.x < p40) {
        this.dy = -this.dy;
        this.dx = -2.5;
        swordSound.play();
      } else if (this.x > p40 && this.x < p60) {
        this.dy = -this.dy;
        this.dx = 0;
        swordSound.play();
      } else if (this.x > p60 && this.x < p80) {
        this.dy = -this.dy;
        this.dx = 2.5;
        swordSound.play();
      } else if (this.x > p80 && this.x < p100) {
        this.dy = -this.dy;
        this.dx = 5;
        swordSound.play();
      }
    }
  }

  edgeCheck(canvas) {
    if (this.x + this.radius > canvas.width 
      || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if(this.y + this.dy < canvas.height - 670) {
      this.dy = -this.dy;
    }

    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    return this;
  }

  move () {
    this.x += this.dx;
    this.y += this.dy;
    return this;
  }
}

module.exports = Ball;