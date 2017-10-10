class Player {
  constructor (lives) {
    this.lives = lives;
    
  }

  deathCheck (ball, canvas, paddle) {
    if (ball.y > canvas.height) {
      this.lives--;
      ball.y = canvas.height / 2;
      ball.x = canvas.width / 3;
      ball.move();
    }
    if (this.lives === 0) {
      alert('you lost loser');
      document.location.reload();
    }
  }

}

module.exports = Player;