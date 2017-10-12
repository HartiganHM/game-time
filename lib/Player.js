class Player {
  constructor (lives) {
    this.lives = lives;
    this.wins = 0;
  }

  deathCheck (ball, canvas) {
    if (ball.y > canvas.height + 10) {
      this.lives--;
      ball.y = 650;
      ball.x = canvas.width / 2;
      ball.dy = 0;
      ball.dx = 0;
      setTimeout(() => {
        ball.dy = -5;
        ball.dx = -1;
      }, 3000);
    }
  }
}

module.exports = Player;