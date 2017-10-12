class Player {
  constructor (lives) {
    this.lives = lives;
    this.wins = 0;
  }

  deathCheck (ball, canvasHeight) {
    if (ball.y > canvasHeight + 10) {
      this.lives--;
      ball.reset();
      return true;
    }
  }
}

module.exports = Player;