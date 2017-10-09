class Player {
  constructor (lives) {
  this.lives = lives;
    
  }

  deathCheck (ball, canvas, paddle) {
     if (ball.y > canvas.height) {
        this.lives--;
        ball.y = paddle.y - 10;
        ball.dy = 0;
        ball.dx = 0;
    }
  }

}

module.exports = Player;