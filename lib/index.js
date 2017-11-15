const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Game = require('./Game.js');
const game = new Game(canvas, context, canvas.width, canvas.height);
const gameStart = document.getElementById('game-start');
const getReady = document.getElementById('get-ready');

const introSound = new Audio('sounds/got-intro.wav');
introSound.volume = 0.08;
introSound.loop = true;

// Play Into Song
window.addEventListener('load', function() {
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
  if(e.keyCode === 32 && game.isRunning === false) {
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
window.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    document.location.reload();
  }
});

// Start on Level 1
window.addEventListener('keyup', function(e) {
  if (e.keyCode === 49 && game.isRunning === false) {
    game.player.wins = 0;
  }
});

// Start on Level 2
window.addEventListener('keyup', function(e) {
  if (e.keyCode === 50 && game.isRunning === false) {
    game.player.wins = 1;
    game.currentLevelCheck();
  }
});

// Start on Level 3
window.addEventListener('keyup', function(e) {
  if (e.keyCode === 51 && game.isRunning === false) {
    game.player.wins = 2;
    game.currentLevelCheck();
  }
});

// Widen Paddle
window.addEventListener('keyup', function(e) {
  if (e.keyCode === 87 && game.widePaddle === false) {
    game.paddle.w = 240;
    game.widePaddle = true;
  }
});