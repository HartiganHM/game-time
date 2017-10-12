class SquarePiece {
  constructor (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw (context, image) {
    context.drawImage(image, this.x, this.y, this.w, this.h);
    return this;
  }

  collide(ball) {
    if (ball.x > this.x 
      && ball.x < this.x + this.w 
      && ball.y + ball.radius > this.y 
      && ball.y - ball.radius < this.y + this.h) {
      ball.dy = -ball.dy;
      return true;
    } else if (ball.y > this.y 
      && ball.y < this.y + this.h 
      && ball.x + ball.radius > this.x 
      && ball.x - ball.radius < this.x + this.w) {
      ball.dx = -ball.dx;
      return true;
    }
  }
}

module.exports = SquarePiece;