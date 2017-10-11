class Player {
  constructor (lives) {
    this.lives = lives;
    this.wins = 2;
  }

  deathCheck (ball, canvas, paddle) {
    if (ball.y > canvas.height + 10) {
      this.lives--;
      ball.y = canvas.height / 2;
      ball.x = canvas.width / 3;
      ball.dy = 0;
      ball.dx = 0;
      setTimeout(() => {
        console.log('hey');
        ball.dy = 5;
      }, 3000);
    }
    if (this.lives === 0) {

      // document.location.reload();
    }
  }

}

module.exports = Player;