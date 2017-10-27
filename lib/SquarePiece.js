const zSound1 = new Audio('../sounds/zombie-1.wav');
const zSound2 = new Audio('../sounds/zombie-2.wav');
const zSound3 = new Audio('../sounds/zombie-3.wav');


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
      this.zombieSound();
      return true;
    } else if (ball.y > this.y 
      && ball.y < this.y + this.h 
      && ball.x + ball.radius > this.x 
      && ball.x - ball.radius < this.x + this.w) {
      ball.dx = -ball.dx;
      this.zombieSound();
      return true;
    }
  }

  zombieSound() {
    const zombieSounds = [ zSound1, zSound2, zSound3 ];
    zombieSounds.forEach( sound => {
      sound.volume = 0.03;
      let index = 3 * Math.random() |0
      console.log(index);
      console.log(zombieSounds[index]);
      zombieSounds[index].play();
    })
  }
}

module.exports = SquarePiece;