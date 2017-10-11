class Player {
  constructor (lives) {
    this.lives = lives;
    this.wins = 2;
  }

  deathCheck (ball, canvas) {
    if (ball.y > canvas.height + 10) {
      this.lives--;
      ball.y = 550;
      ball.x = canvas.width / 3;
      ball.dy = 0;
      ball.dx = 0;
      setTimeout(() => {
        ball.dy = 5;
      }, 3000);
    }
  }
}

module.exports = Player;