/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');
	const Game = __webpack_require__(1);
	const game = new Game(canvas, context, canvas.width, canvas.height);
	const gameStart = document.getElementById('game-start');
	const getReady = document.getElementById('get-ready');

	const introSound = new Audio('sounds/got-intro.wav');
	introSound.volume = 0.08;
	introSound.loop = true;

	// Play Into Song
	window.addEventListener('load', function () {
	  introSound.currentTime = 1.5;
	  introSound.play();
	});

	// Paddle Movement Left and Right
	window.addEventListener('keydown', function (e) {
	  game.paddle.keys[e.keyCode] = true;
	});

	window.addEventListener('keyup', function (e) {
	  game.paddle.keys[e.keyCode] = false;
	});

	// Start Game
	window.addEventListener('keyup', function (e) {
	  if (e.keyCode === 32 && game.isRunning === false) {
	    game.startGame(canvas);
	    game.isRunning = true;
	    gameStart.style.display = 'none';
	    getReady.style.display = 'block';
	    canvas.style.display = 'block';
	    introSound.pause();
	    introSound.currentTime = 0;
	  }
	});

	// Restart Game
	window.addEventListener('keyup', function (e) {
	  if (e.keyCode === 13) {
	    document.location.reload();
	  }
	});

	// Start on Level 1
	window.addEventListener('keyup', function (e) {
	  if (e.keyCode === 49 && game.isRunning === false) {
	    game.player.wins = 0;
	  }
	});

	// Start on Level 2
	window.addEventListener('keyup', function (e) {
	  if (e.keyCode === 50 && game.isRunning === false) {
	    game.player.wins = 1;
	    game.currentLevelCheck();
	  }
	});

	// Start on Level 3
	window.addEventListener('keyup', function (e) {
	  if (e.keyCode === 51 && game.isRunning === false) {
	    game.player.wins = 2;
	    game.currentLevelCheck();
	  }
	});

	// Widen Paddle
	window.addEventListener('keyup', function (e) {
	  if (e.keyCode === 87 && game.widePaddle === false) {
	    game.paddle.w = 240;
	    game.widePaddle = true;
	  }
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// Class scripts
	const Paddle = __webpack_require__(2);
	const Ball = __webpack_require__(4);
	const Player = __webpack_require__(5);
	const CurrentLevel = __webpack_require__(6);
	const SquarePiece = __webpack_require__(3);

	// Images
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

	// Sounds
	const gamePlaySound = new Audio('sounds/got-intro.wav');
	gamePlaySound.volume = 0.08;
	gamePlaySound.loop = true;

	const lastLevelSound = new Audio('sounds/got-light-of-the-seven.wav');
	lastLevelSound.volume = 0.15;
	lastLevelSound.loop = true;

	const gameOverSound = new Audio('sounds/got-rains-of-castamere.wav');
	gameOverSound.currentTime = 4;
	gameOverSound.volume = 0.08;
	gameOverSound.loop = true;

	const gameWin = new Audio('sounds/got-theme.mp3');
	gameWin.volume = 0.08;

	const zSound1 = new Audio('sounds/zombie-1.wav');
	const zSound2 = new Audio('sounds/zombie-2.wav');
	const zSound3 = new Audio('sounds/zombie-3.wav');

	// Game
	module.exports = class Game {
	  constructor(canvas, context, width, height) {
	    this.blockArr = [];
	    this.width = width;
	    this.height = height;
	    this.canvas = canvas;
	    this.context = context;
	    this.score = 0;
	    this.paddle = new Paddle(this.width / 2, this.height - 30, 120, 30);
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
	    }
	  }

	  scoreCheck() {
	    if (this.blockArr.length === 0) {
	      this.player.wins++;
	      this.player.lives = 3;
	      this.currentLevelCheck();
	      this.stack();
	      this.winCheck();
	      this.ball.reset();
	    }
	  }

	  currentLevelCheck() {
	    if (this.player.wins === 0) {
	      return this.currentLevel = CurrentLevel.level1;
	    } else if (this.player.wins === 1) {
	      return this.currentLevel = CurrentLevel.level2;
	    } else if (this.player.wins === 2) {
	      return this.currentLevel = CurrentLevel.level3;
	    }
	  }

	  stack() {
	    for (let i = 0; i < this.currentLevel.length; i++) {
	      this.blockArr.push(new SquarePiece(this.currentLevel[i].x, this.currentLevel[i].y, this.currentLevel[i].w, this.currentLevel[i].h));
	    }
	  }

	  drawBricks(array, context, player) {
	    this.blockArr.forEach(function (brick) {
	      if (player.wins === 0) {
	        brick.draw(context, wideZombieBrick);
	      } else if (player.wins === 1) {
	        brick.draw(context, mediumZombieBrick);
	      } else if (player.wins === 2) {
	        brick.draw(context, smallZombieBrick);
	        gamePlaySound.pause();
	        gamePlaySound.currentTime = 0;
	        lastLevelSound.play();
	        lastLevelSound.loop = true;
	      }
	    });
	  }

	  drawScore(context, score) {
	    context.font = "24px 'Merriweather', serif";
	    context.fillStyle = 'black';
	    context.fillText("Score: " + score, 20, 30);
	  }

	  drawLives() {
	    this.context.font = "24px 'Merriweather', serif";
	    this.context.fillStyle = 'black';
	    this.context.fillText("Lives Left: " + this.player.lives, this.canvas.width - 160, 30);
	  }

	  gameLoop() {
	    this.context.clearRect(0, 0, this.width, this.height);
	    this.ball.draw(this.context).move().paddleHit(this.paddle);
	    this.ball.edgeCheck(this.canvas);
	    this.paddle.move().edgeCheck(this.canvas).draw(this.context, paddleImage);

	    if (this.player.deathCheck(this.ball, 720)) {
	      this.transitionCheck();
	    }

	    this.drawBricks(this.blockArr, this.context, this.player);
	    this.drawLives(this.context);
	    this.drawScore(this.context, this.score);
	    this.scoreCheck();

	    this.blockArr.forEach((block, index) => {
	      if (block.collide(this.ball, this.blockArr)) {
	        this.blockArr.splice(index, 1);
	        this.score += 100;
	        this.zombieSound();
	      }
	    });

	    if (this.player.wins === 3) {
	      this.canvas.style.display = 'none';
	      victory.style.display = 'block';
	      this.soundStop();
	      gameWin.play();
	    } else if (this.player.lives > 0) {
	      requestAnimationFrame(this.gameLoop.bind(this));
	    } else {
	      this.canvas.style.display = 'none';
	      gameOver.style.display = 'block';
	      this.soundStop();
	      gameOverSound.play();
	    }
	  }

	  startGame() {
	    this.stack();
	    gamePlaySound.currentTime = 1.5;
	    gamePlaySound.play();
	    setTimeout(() => {
	      getReady.style.display = 'none';
	      this.ball.dy = -5;
	      this.ball.dx = -1;
	    }, 4000);
	    requestAnimationFrame(this.gameLoop.bind(this));
	  }

	  zombieSound() {
	    let index = 3 * Math.random() | 0;
	    const zombieSounds = [zSound1, zSound2, zSound3];
	    zombieSounds.forEach(sound => sound.volume = 0.08);
	    zombieSounds[index].play();
	  }

	  soundStop() {
	    const sounds = [zSound1, zSound2, zSound3, lastLevelSound, gamePlaySound];
	    sounds.forEach(sound => {
	      sound.pause();
	      sound.currentTime = 0;
	    });
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const SquarePiece = __webpack_require__(3);

	class Paddle extends SquarePiece {
	  constructor() {
	    super(...arguments);
	    this.speed = 5;
	    this.dx = 0;
	    this.friction = 0.98;
	    this.keys = [];
	  }

	  move() {
	    if (this.keys[37]) {
	      if (this.dx > -this.speed) {
	        this.dx--;
	      }
	    }

	    if (this.keys[39]) {
	      if (this.dx < this.speed) {
	        this.dx++;
	      }
	    }
	    this.dx *= this.friction;
	    this.x += this.dx;
	    return this;
	  }

	  edgeCheck(canvas) {
	    if (this.x + this.w >= canvas.width) {
	      this.x = canvas.width - this.w;
	    } else if (this.x <= 0) {
	      this.x = 0;
	    }
	    return this;
	  }
	}

	module.exports = Paddle;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	class SquarePiece {
	  constructor(x, y, w, h) {
	    this.x = x;
	    this.y = y;
	    this.w = w;
	    this.h = h;
	  }

	  draw(context, image) {
	    context.drawImage(image, this.x, this.y, this.w, this.h);
	    return this;
	  }

	  collide(ball) {
	    if (ball.x > this.x && ball.x < this.x + this.w && ball.y + ball.radius > this.y && ball.y - ball.radius < this.y + this.h) {
	      ball.dy = -ball.dy;
	      return true;
	    } else if (ball.y > this.y && ball.y < this.y + this.h && ball.x + ball.radius > this.x && ball.x - ball.radius < this.x + this.w) {
	      ball.dx = -ball.dx;
	      return true;
	    }
	  }
	}

	module.exports = SquarePiece;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	const swordSound = new Audio('sounds/sword.wav');
	swordSound.volume = 0.08;

	class Ball {
	  constructor(x, y, radius, angleStart, angleEnd, counterclockwise) {
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    this.angleStart = angleStart;
	    this.angleEnd = angleEnd;
	    this.counterclockwise = counterclockwise;
	    this.dx = 0;
	    this.dy = 0;
	  }

	  draw(context) {
	    let gradient = context.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 0);
	    context.beginPath();
	    context.arc(this.x, this.y, this.radius, this.angleStart, this.angleEnd, this.clockwise);
	    gradient.addColorStop(0, '#0DFCFC');
	    gradient.addColorStop(1, '#0547fA');
	    context.fillStyle = gradient;
	    context.fill();
	    context.lineWidth = 1;
	    context.strokeStyle = '#3D3196';
	    context.stroke();
	    return this;
	  }

	  reset() {
	    this.y = 650;
	    this.x = 400;
	    this.dy = 0;
	    this.dx = 0;
	    setTimeout(() => {
	      this.dy = -5;
	      this.dx = -1;
	    }, 4000);
	  }

	  paddleHit(paddle) {
	    let p0 = paddle.x - 15;
	    let p20 = paddle.x + paddle.w * .2;
	    let p40 = paddle.x + paddle.w * .4;
	    let p60 = paddle.x + paddle.w * .6;
	    let p80 = paddle.x + paddle.w * .8;
	    let p100 = paddle.x + paddle.w + 15;

	    if (this.y + this.radius === paddle.y) {
	      if (this.x > p0 && this.x < p20) {
	        this.dy = -this.dy;
	        this.dx = -5;
	        swordSound.play();
	      } else if (this.x > p20 && this.x < p40) {
	        this.dy = -this.dy;
	        this.dx = -2.5;
	        swordSound.play();
	      } else if (this.x > p40 && this.x < p60) {
	        this.dy = -this.dy;
	        this.dx = 0;
	        swordSound.play();
	      } else if (this.x > p60 && this.x < p80) {
	        this.dy = -this.dy;
	        this.dx = 2.5;
	        swordSound.play();
	      } else if (this.x > p80 && this.x < p100) {
	        this.dy = -this.dy;
	        this.dx = 5;
	        swordSound.play();
	      }
	    }
	  }

	  edgeCheck(canvas) {
	    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
	      this.dx = -this.dx;
	    }

	    if (this.y + this.dy < canvas.height - 670) {
	      this.dy = -this.dy;
	    }

	    if (this.y - this.radius < 0) {
	      this.dy = -this.dy;
	    }
	    return this;
	  }

	  move() {
	    this.x += this.dx;
	    this.y += this.dy;
	    return this;
	  }
	}

	module.exports = Ball;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	class Player {
	  constructor(lives) {
	    this.lives = lives;
	    this.wins = 0;
	  }

	  deathCheck(ball, canvasHeight) {
	    if (ball.y > canvasHeight + 10) {
	      this.lives--;
	      ball.reset();
	      return true;
	    }
	  }
	}

	module.exports = Player;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = {
	  level1: [{ x: 170, y: 100, w: 80, h: 35 }, { x: 250, y: 100, w: 80, h: 35 }, { x: 330, y: 100, w: 80, h: 35 }, { x: 410, y: 100, w: 80, h: 35 }, { x: 490, y: 100, w: 80, h: 35 }, { x: 170, y: 135, w: 80, h: 35 }, { x: 330, y: 135, w: 80, h: 35 }, { x: 490, y: 135, w: 80, h: 35 }, { x: 170, y: 170, w: 80, h: 35 }, { x: 250, y: 170, w: 80, h: 35 }, { x: 410, y: 170, w: 80, h: 35 }, { x: 490, y: 170, w: 80, h: 35 }, { x: 170, y: 205, w: 80, h: 35 }, { x: 330, y: 205, w: 80, h: 35 }, { x: 490, y: 205, w: 80, h: 35 }, { x: 170, y: 240, w: 80, h: 35 }, { x: 250, y: 240, w: 80, h: 35 }, { x: 330, y: 240, w: 80, h: 35 }, { x: 410, y: 240, w: 80, h: 35 }, { x: 490, y: 240, w: 80, h: 35 }],

	  level2: [{ x: 470, y: 80, w: 30, h: 30 }, { x: 500, y: 80, w: 30, h: 30 }, { x: 530, y: 80, w: 30, h: 30 }, { x: 440, y: 110, w: 30, h: 30 }, { x: 530, y: 110, w: 30, h: 30 }, { x: 410, y: 140, w: 30, h: 30 }, { x: 500, y: 140, w: 30, h: 30 }, { x: 380, y: 170, w: 30, h: 30 }, { x: 470, y: 170, w: 30, h: 30 }, { x: 350, y: 200, w: 30, h: 30 }, { x: 440, y: 200, w: 30, h: 30 }, { x: 320, y: 230, w: 30, h: 30 }, { x: 410, y: 230, w: 30, h: 30 }, { x: 140, y: 260, w: 30, h: 30 }, { x: 170, y: 260, w: 30, h: 30 }, { x: 290, y: 260, w: 30, h: 30 }, { x: 380, y: 260, w: 30, h: 30 }, { x: 140, y: 290, w: 30, h: 30 }, { x: 170, y: 290, w: 30, h: 30 }, { x: 200, y: 290, w: 30, h: 30 }, { x: 260, y: 290, w: 30, h: 30 }, { x: 350, y: 290, w: 30, h: 30 }, { x: 170, y: 320, w: 30, h: 30 }, { x: 200, y: 320, w: 30, h: 30 }, { x: 230, y: 320, w: 30, h: 30 }, { x: 320, y: 320, w: 30, h: 30 }, { x: 170, y: 350, w: 30, h: 30 }, { x: 200, y: 350, w: 30, h: 30 }, { x: 230, y: 350, w: 30, h: 30 }, { x: 290, y: 350, w: 30, h: 30 }, { x: 200, y: 380, w: 30, h: 30 }, { x: 230, y: 380, w: 30, h: 30 }, { x: 260, y: 380, w: 30, h: 30 }, { x: 290, y: 380, w: 30, h: 30 }, { x: 170, y: 410, w: 30, h: 30 }, { x: 200, y: 410, w: 30, h: 30 }, { x: 230, y: 410, w: 30, h: 30 }, { x: 260, y: 410, w: 30, h: 30 }, { x: 290, y: 410, w: 30, h: 30 }, { x: 320, y: 410, w: 30, h: 30 }, { x: 170, y: 410, w: 30, h: 30 }, { x: 140, y: 440, w: 30, h: 30 }, { x: 170, y: 440, w: 30, h: 30 }, { x: 200, y: 440, w: 30, h: 30 }, { x: 260, y: 440, w: 30, h: 30 }, { x: 290, y: 440, w: 30, h: 30 }, { x: 320, y: 440, w: 30, h: 30 }, { x: 350, y: 440, w: 30, h: 30 }, { x: 80, y: 470, w: 30, h: 30 }, { x: 110, y: 470, w: 30, h: 30 }, { x: 140, y: 470, w: 30, h: 30 }, { x: 170, y: 470, w: 30, h: 30 }, { x: 320, y: 470, w: 30, h: 30 }, { x: 350, y: 470, w: 30, h: 30 }, { x: 80, y: 500, w: 30, h: 30 }, { x: 140, y: 500, w: 30, h: 30 }, { x: 80, y: 530, w: 30, h: 30 }, { x: 110, y: 530, w: 30, h: 30 }, { x: 140, y: 500, w: 30, h: 30 }],

	  level3: [{ x: 120, y: 70, w: 35, h: 20 }, { x: 260, y: 70, w: 35, h: 20 }, { x: 295, y: 70, w: 35, h: 20 }, { x: 300, y: 70, w: 35, h: 20 }, { x: 120, y: 90, w: 35, h: 20 }, { x: 155, y: 90, w: 35, h: 20 }, { x: 190, y: 90, w: 35, h: 20 }, { x: 225, y: 90, w: 35, h: 20 }, { x: 260, y: 90, w: 35, h: 20 }, { x: 295, y: 90, w: 35, h: 20 }, { x: 330, y: 90, w: 35, h: 20 }, { x: 365, y: 90, w: 35, h: 20 }, { x: 400, y: 90, w: 35, h: 20 }, { x: 50, y: 110, w: 35, h: 20 }, { x: 85, y: 110, w: 35, h: 20 }, { x: 120, y: 110, w: 35, h: 20 }, { x: 155, y: 110, w: 35, h: 20 }, { x: 190, y: 110, w: 35, h: 20 }, { x: 225, y: 110, w: 35, h: 20 }, { x: 260, y: 110, w: 35, h: 20 }, { x: 295, y: 110, w: 35, h: 20 }, { x: 330, y: 110, w: 35, h: 20 }, { x: 365, y: 110, w: 35, h: 20 }, { x: 400, y: 110, w: 35, h: 20 }, { x: 435, y: 110, w: 35, h: 20 }, { x: 470, y: 110, w: 35, h: 20 }, { x: 50, y: 130, w: 35, h: 20 }, { x: 85, y: 130, w: 35, h: 20 }, { x: 120, y: 130, w: 35, h: 20 }, { x: 155, y: 130, w: 35, h: 20 }, { x: 190, y: 130, w: 35, h: 20 }, { x: 225, y: 130, w: 35, h: 20 }, { x: 260, y: 130, w: 35, h: 20 }, { x: 295, y: 130, w: 35, h: 20 }, { x: 330, y: 130, w: 35, h: 20 }, { x: 365, y: 130, w: 35, h: 20 }, { x: 400, y: 130, w: 35, h: 20 }, { x: 435, y: 130, w: 35, h: 20 }, { x: 470, y: 130, w: 35, h: 20 }, { x: 505, y: 130, w: 35, h: 20 }, { x: 50, y: 150, w: 35, h: 20 }, { x: 85, y: 150, w: 35, h: 20 }, { x: 120, y: 150, w: 35, h: 20 }, { x: 155, y: 150, w: 35, h: 20 }, { x: 190, y: 150, w: 35, h: 20 }, { x: 225, y: 150, w: 35, h: 20 }, { x: 260, y: 150, w: 35, h: 20 }, { x: 295, y: 150, w: 35, h: 20 }, { x: 330, y: 150, w: 35, h: 20 }, { x: 435, y: 150, w: 35, h: 20 }, { x: 470, y: 150, w: 35, h: 20 }, { x: 505, y: 150, w: 35, h: 20 }, { x: 540, y: 150, w: 35, h: 20 }, { x: 575, y: 150, w: 35, h: 20 }, { x: 610, y: 150, w: 35, h: 20 }, { x: 50, y: 170, w: 35, h: 20 }, { x: 85, y: 170, w: 35, h: 20 }, { x: 120, y: 170, w: 35, h: 20 }, { x: 155, y: 170, w: 35, h: 20 }, { x: 190, y: 170, w: 35, h: 20 }, { x: 225, y: 170, w: 35, h: 20 }, { x: 260, y: 170, w: 35, h: 20 }, { x: 295, y: 170, w: 35, h: 20 }, { x: 330, y: 170, w: 35, h: 20 }, { x: 365, y: 170, w: 35, h: 20 }, { x: 400, y: 170, w: 35, h: 20 }, { x: 435, y: 170, w: 35, h: 20 }, { x: 470, y: 170, w: 35, h: 20 }, { x: 505, y: 170, w: 35, h: 20 }, { x: 540, y: 170, w: 35, h: 20 }, { x: 575, y: 170, w: 35, h: 20 }, { x: 610, y: 170, w: 35, h: 20 }, { x: 645, y: 170, w: 35, h: 20 }, { x: 680, y: 170, w: 35, h: 20 }, { x: 50, y: 190, w: 35, h: 20 }, { x: 85, y: 190, w: 35, h: 20 }, { x: 120, y: 190, w: 35, h: 20 }, { x: 155, y: 190, w: 35, h: 20 }, { x: 190, y: 190, w: 35, h: 20 }, { x: 225, y: 190, w: 35, h: 20 }, { x: 260, y: 190, w: 35, h: 20 }, { x: 295, y: 190, w: 35, h: 20 }, { x: 330, y: 190, w: 35, h: 20 }, { x: 365, y: 190, w: 35, h: 20 }, { x: 400, y: 190, w: 35, h: 20 }, { x: 505, y: 190, w: 35, h: 20 }, { x: 540, y: 190, w: 35, h: 20 }, { x: 575, y: 190, w: 35, h: 20 }, { x: 610, y: 190, w: 35, h: 20 }, { x: 645, y: 190, w: 35, h: 20 }, { x: 680, y: 190, w: 35, h: 20 }, { x: 50, y: 210, w: 35, h: 20 }, { x: 85, y: 210, w: 35, h: 20 }, { x: 120, y: 210, w: 35, h: 20 }, { x: 155, y: 210, w: 35, h: 20 }, { x: 190, y: 210, w: 35, h: 20 }, { x: 225, y: 210, w: 35, h: 20 }, { x: 260, y: 210, w: 35, h: 20 }, { x: 295, y: 210, w: 35, h: 20 }, { x: 330, y: 210, w: 35, h: 20 }, { x: 365, y: 210, w: 35, h: 20 }, { x: 470, y: 210, w: 35, h: 20 }, { x: 505, y: 210, w: 35, h: 20 }, { x: 575, y: 210, w: 35, h: 20 }, { x: 610, y: 210, w: 35, h: 20 }, { x: 645, y: 210, w: 35, h: 20 }, { x: 680, y: 210, w: 35, h: 20 }, { x: 50, y: 230, w: 35, h: 20 }, { x: 85, y: 230, w: 35, h: 20 }, { x: 120, y: 230, w: 35, h: 20 }, { x: 155, y: 230, w: 35, h: 20 }, { x: 190, y: 230, w: 35, h: 20 }, { x: 225, y: 230, w: 35, h: 20 }, { x: 260, y: 230, w: 35, h: 20 }, { x: 295, y: 230, w: 35, h: 20 }, { x: 330, y: 230, w: 35, h: 20 }, { x: 365, y: 230, w: 35, h: 20 }, { x: 435, y: 230, w: 35, h: 20 }, { x: 540, y: 230, w: 35, h: 20 }, { x: 575, y: 230, w: 35, h: 20 }, { x: 645, y: 230, w: 35, h: 20 }, { x: 50, y: 250, w: 35, h: 20 }, { x: 85, y: 250, w: 35, h: 20 }, { x: 120, y: 250, w: 35, h: 20 }, { x: 155, y: 250, w: 35, h: 20 }, { x: 190, y: 250, w: 35, h: 20 }, { x: 225, y: 250, w: 35, h: 20 }, { x: 260, y: 250, w: 35, h: 20 }, { x: 295, y: 250, w: 35, h: 20 }, { x: 330, y: 250, w: 35, h: 20 }, { x: 365, y: 250, w: 35, h: 20 }, { x: 400, y: 250, w: 35, h: 20 }, { x: 435, y: 250, w: 35, h: 20 }, { x: 505, y: 250, w: 35, h: 20 }, { x: 610, y: 250, w: 35, h: 20 }, { x: 645, y: 250, w: 35, h: 20 }, { x: 50, y: 270, w: 35, h: 20 }, { x: 85, y: 270, w: 35, h: 20 }, { x: 120, y: 270, w: 35, h: 20 }, { x: 155, y: 270, w: 35, h: 20 }, { x: 190, y: 270, w: 35, h: 20 }, { x: 225, y: 270, w: 35, h: 20 }, { x: 260, y: 270, w: 35, h: 20 }, { x: 295, y: 270, w: 35, h: 20 }, { x: 330, y: 270, w: 35, h: 20 }, { x: 365, y: 270, w: 35, h: 20 }, { x: 400, y: 270, w: 35, h: 20 }, { x: 435, y: 270, w: 35, h: 20 }, { x: 470, y: 270, w: 35, h: 20 }, { x: 505, y: 270, w: 35, h: 20 }, { x: 575, y: 270, w: 35, h: 20 }, { x: 50, y: 290, w: 35, h: 20 }, { x: 85, y: 290, w: 35, h: 20 }, { x: 120, y: 290, w: 35, h: 20 }, { x: 155, y: 290, w: 35, h: 20 }, { x: 190, y: 290, w: 35, h: 20 }, { x: 225, y: 290, w: 35, h: 20 }, { x: 260, y: 290, w: 35, h: 20 }, { x: 295, y: 290, w: 35, h: 20 }, { x: 365, y: 290, w: 35, h: 20 }, { x: 400, y: 290, w: 35, h: 20 }, { x: 435, y: 290, w: 35, h: 20 }, { x: 470, y: 290, w: 35, h: 20 }, { x: 505, y: 290, w: 35, h: 20 }, { x: 540, y: 290, w: 35, h: 20 }, { x: 575, y: 290, w: 35, h: 20 }, { x: 50, y: 310, w: 35, h: 20 }, { x: 85, y: 310, w: 35, h: 20 }, { x: 120, y: 310, w: 35, h: 20 }, { x: 155, y: 310, w: 35, h: 20 }, { x: 190, y: 310, w: 35, h: 20 }, { x: 225, y: 310, w: 35, h: 20 }, { x: 260, y: 310, w: 35, h: 20 }, { x: 295, y: 310, w: 35, h: 20 }, { x: 505, y: 310, w: 35, h: 20 }, { x: 540, y: 310, w: 35, h: 20 }, { x: 575, y: 310, w: 35, h: 20 }, { x: 50, y: 330, w: 35, h: 20 }, { x: 85, y: 330, w: 35, h: 20 }, { x: 120, y: 330, w: 35, h: 20 }, { x: 155, y: 330, w: 35, h: 20 }, { x: 190, y: 330, w: 35, h: 20 }, { x: 225, y: 330, w: 35, h: 20 }, { x: 260, y: 330, w: 35, h: 20 }, { x: 295, y: 330, w: 35, h: 20 }, { x: 330, y: 330, w: 35, h: 20 }, { x: 540, y: 330, w: 35, h: 20 }, { x: 50, y: 350, w: 35, h: 20 }, { x: 85, y: 350, w: 35, h: 20 }, { x: 120, y: 350, w: 35, h: 20 }, { x: 155, y: 350, w: 35, h: 20 }, { x: 190, y: 350, w: 35, h: 20 }, { x: 225, y: 350, w: 35, h: 20 }, { x: 260, y: 350, w: 35, h: 20 }, { x: 50, y: 370, w: 35, h: 20 }, { x: 85, y: 370, w: 35, h: 20 }, { x: 120, y: 370, w: 35, h: 20 }, { x: 155, y: 370, w: 35, h: 20 }, { x: 190, y: 370, w: 35, h: 20 }, { x: 225, y: 370, w: 35, h: 20 }, { x: 50, y: 390, w: 35, h: 20 }, { x: 85, y: 390, w: 35, h: 20 }, { x: 120, y: 390, w: 35, h: 20 }, { x: 155, y: 390, w: 35, h: 20 }, { x: 190, y: 390, w: 35, h: 20 }]
	};

/***/ })
/******/ ]);