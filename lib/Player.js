class Player {
  constructor (lives) {
    this.lives = lives;
    this.wins = 0;

  }

  deathCheck (ball, canvas, game) {
    if (ball.y > canvas.height + 10) {
      this.lives--;
      game.transitionCheck();
      ball.y = 650;
      ball.x = canvas.width / 2;
      ball.dy = 0;
      ball.dx = 0;
      setTimeout(() => {
        ball.dy = -5;
        ball.dx = -1;
      }, 4000);
    }
  }
}

module.exports = Player;