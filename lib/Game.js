const Paddle = require('./Paddle.js');
const Ball = require('./Ball.js');
const Player = require('./Player.js');
const CurrentLevel = require('./Levels.js');
const SquarePiece = require('./SquarePiece.js');
const Audio = require('./Audio.js');
const wideZombieBrick = document.getElementById('wide-zombie');
const mediumZombieBrick = document.getElementById('medium-zombie');
const smallZombieBrick = document.getElementById('small-zombie');
const paddleImage = document.getElementById('paddle');
const getReady = document.getElementById('get-ready');
const death1 = document.getElementById('death-1');
const death2 = document.getElementById('death-2');
const win1 = document.getElementById('win-1');
const win2 = document.getElementById('win-2');
const gameOver = document.getElementById('game-over');
const victory = document.getElementById('victory');
const introSound = new Audio('../sounds/Game-of-Thrones-8-bit.wav');
introSound.volume = 0.3;


module.exports = class Game {
  constructor (canvas, context, width, height) {
    this.blockArr = [];
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = context;
    this.score = 0;
    this.paddle = new Paddle(this.width/ 2, this.height - 30, 120, 30);
    this.ball = new Ball(this.width / 2, 650, 10, 0, Math.PI * 2, false);
    this.player = new Player(3);
    this.currentLevel = this.currentLevelCheck();
    this.isRunning = false;
    this.widePaddle = false;
  }

  transitionCheck() {
    if (this.player.lives === 2) {
      death1.style.display = 'block';
      setTimeout(() => {
        death1.style.display = 'none';
      }, 4000);
    } else if (this.player.lives === 1) {
      death2.style.display = 'block';
      setTimeout(() => {
        death2.style.display = 'none';
      }, 4000);
    }
  }

  winCheck() {
    if (this.player.wins === 1) {
      win1.style.display = 'block';
      setTimeout(() => {
        win1.style.display = 'none';
      }, 4000);
    } else if (this.player.wins === 2) {
      win2.style.display = 'block';
      setTimeout(() => {
        win2.style.display = 'none';
      }, 4000);
    } else if (this.player.wins === 3) {
      this.canvas.style.display = 'none';
      victory.style.display = 'block';
    }
  }

  scoreCheck() {
    if (this.blockArr.length === 0) {
      this.player.wins++;
      this.player.lives = 3;
      this.score = 0;
      this.currentLevelCheck();
      this.stack();
      this.winCheck();
      this.ball.reset();
    }
  }

  currentLevelCheck () {
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

  drawBricks (array, context, player) {
    this.blockArr.forEach(function(brick) {
      if (player.wins === 0) {
        brick.draw(context, wideZombieBrick);
      } else if (player.wins === 1) {
        brick.draw(context, mediumZombieBrick);
      } else if (player.wins === 2) {
        brick.draw(context, smallZombieBrick);
      }
    });
  }

  drawScore (context, score) {
    context.font = "24px 'Merriweather', serif";
    context.fillStyle = 'black';
    context.fillText("Score: " + score, 20, 30);	
  }

  drawLives () {
    this.context.font = "24px 'Merriweather', serif";
    this.context.fillStyle = 'black';
    this.context.fillText("Lives Left: " + this.player.lives, this.canvas.width - 160, 30);
  }

  gameLoop () {
    this.context.clearRect(0, 0, this.width, this.height);
    this.ball
      .draw(this.context)
      .move()
      .paddleHit(this.paddle);
    this.ball.edgeCheck(this.canvas);
    this.paddle.move()
      .edgeCheck(this.canvas)
      .draw(this.context, paddleImage);

    if (this.player.deathCheck(this.ball, 720)) {
      this.transitionCheck();
    };

    this.drawBricks(this.blockArr, this.context, this.player);
    this.drawLives(this.context);
    this.drawScore(this.context, this.score);
    this.scoreCheck();

    this.blockArr.forEach((block, index) => {
      if (block.collide(this.ball, this.blockArr)) {
        this.blockArr.splice(index, 1);
        this.score += 100;
      };
    });

    if (this.player.lives > 0) {
      requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      this.canvas.style.display = 'none';
      gameOver.style.display = 'block';
    }
  }

  startGame() {
    this.stack();
    setTimeout(() => {
      getReady.style.display = 'none';
      this.ball.dy = -5;
      this.ball.dx = -1;
    }, 4000);
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  war() {
    const balls = []

    for ( let i = 0; i < 9; i ++) {
      let warBall = new Ball (this.width / 2 + ())
    }
    this.ball2 = new Ball (this.width / 4, 650, 10, 0, Math.PI * 2, false);
    this.ball3 = new Ball (this.width / 8, 650, 10, 0, Math.PI * 2, false);
    this.ball4 = new Ball (this.width / 16, 650, 10, 0, Math.PI * 2, false);
    this.ball5 = new Ball (this.width / 32, 650, 10, 0, Math.PI * 2, false);
    this.ball6 = new Ball ((this.width / 2) + (this.width / 32), 650, 10, 0, Math.PI * 2, false);
    this.ball7 = new Ball ((this.width / 2) + (this.width / 16), 650, 10, 0, Math.PI * 2, false);
    this.ball8 = new Ball ((this.width / 2) + (this.width / 8), 650, 10, 0, Math.PI * 2, false);
    this.ball9 = new Ball ((this.width / 2) + (this.width / 4), 650, 10, 0, Math.PI * 2, false);
    this.ball10 = new Ball (this.width / 2, 650, 10, 0, Math.PI * 2, false);
  }
};