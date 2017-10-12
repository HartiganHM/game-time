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
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.angleStart, this.angleEnd, this.clockwise);
    context.fill();
    return this;
  }

  paddleHit (paddle) {
    let p0 = paddle.x + 5;
    let p20 = paddle.x + (paddle.w * .2);
    let p40 = paddle.x + (paddle.w * .4);
    let p60 = paddle.x + (paddle.w * .6);
    let p80 = paddle.x + (paddle.w * .8);
    let p100 = paddle.x + paddle.w + 5;

    if (this.y + this.radius === paddle.y) {
      if (this.x > p0 && this.x < p20) {
        this.dy = -this.dy;
        this.dx = -5;
      } else if (this.x > p20 && this.x < p40) {
        this.dy = -this.dy;
        this.dx = -2.5;
      } else if (this.x > p40 && this.x < p60) {
        this.dy = -this.dy;
        this.dx = 0;
      } else if (this.x > p60 && this.x < p80) {
        this.dy = -this.dy;
        this.dx = 2.5;
      } else if (this.x > p80 && this.x < p100) {
        this.dy = -this.dy;
        this.dx = 5;
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