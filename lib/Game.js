const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const SquarePiece = require('./SquarePiece.js');
const Player = require('./Player.js');
const GameEnd = require('./GameEnd.js');
const blueBrick = document.getElementById('blue-brick');
const paddleImage = document.getElementById('paddle');
const CurrentLevel = require('./Levels.js');

module.exports = class Game {
  constructor (canvas, context, width, height, score) {
    this.blockArr = [];
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = context;
    this.score = 0;
    this.paddle = new Paddle(this.width/ 2, this.height - 30, 120, 30);
    this.ball = new Ball(this.width / 3, 550, 10, 0, Math.PI * 2, false);
    this.player = new Player(3);
    this.currentLevel = this.currentLevelCheck();
    this.gameEnd = new GameEnd(50, 100, 750, 500);
    this.isRunning = false;
  }

  currentLevelCheck () {
    console.log(this.player.wins);
    if (this.player.wins === 0) {
      return this.currentLevel = CurrentLevel.level1;
    } else if (this.player.wins === 1) {
      return this.currentLevel = CurrentLevel.level2;
    } else if (this.player.wins === 2) {
      return this.currentLevel = CurrentLevel.level3;
    }
  }

  stack () {
    for (let i = 0; i < this.currentLevel.length; i++) {
      this.blockArr.push(new SquarePiece(this.currentLevel[i].x, this.currentLevel[i].y, this.currentLevel[i].w, this.currentLevel[i].h));
    }
  }

  drawBricks (array, context) {
    this.blockArr.forEach(function(brick) {
      brick.draw(context, blueBrick);
    });
  }

  drawScore (context, score) {
    context.font = "24px Arial";
    context.fillText("Score: " + score, 20, 30);	
  }

  drawLives () {
    this.context.font = "24px Arial";
    this.context.fillText("Lives Left: " + this.player.lives, this.canvas.width - 150, 30);
  }

  scoreCheck () {
    this.score = -((this.blockArr.length-40) * 100); 
  }

  gameOver () {
    if (this.player.lives === 0) {
      console.log('you lose');
      // this.gameEnd.draw(context, gameOverImage);
    }
  }

  gameLoop () {
    // window.setTimeout(this.ball.move(), 3000);
    
    this.context.clearRect(0, 0, this.width, this.height);
    this.ball
    .draw(this.context)
    // .move()
    .paddleHit(this.paddle);
    // this.currentLevelCheck();
    this.ball.edgeCheck(this.canvas);
    // this.ball.paddleSideHit(this.paddle);
    this.paddle.move().edgeCheck(this.canvas).draw(this.context, paddle);
    this.drawBricks(this.blockArr, this.context);
    this.drawLives(this.context);
    this.drawScore(this.context, this.score);
    this.player.deathCheck(this.ball, this.canvas, this.paddle);
    this.gameOver();
    requestAnimationFrame(this.gameLoop.bind(this));
    this.blockArr.forEach((squareP, index) => {
      squareP.collide(this.ball, this.blockArr, index);
      this.scoreCheck();
    });
  }

  startGame(canvas) {
    this.stack();
    setTimeout(() => {
      this.ball.dy = 5;
    }, 3000);
    requestAnimationFrame(this.gameLoop.bind(this));
  }	

};
		

	 
  

