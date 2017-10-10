class Player {
  constructor (lives) {
  this.lives = lives;
    
  }

  deathCheck (ball, canvas, paddle) {
     if (ball.y > canvas.height) {
        this.lives--;
        ball.y = canvas.height / 2;
        ball.x = canvas.width / 2
        ball.move()
    }
  }

}

module.exports = Player;