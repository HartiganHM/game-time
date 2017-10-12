const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const Game = require('./Game.js');
const game = new Game(canvas, context, canvas.width, canvas.height);
const gameStart = document.getElementById('game-start');
const getReady = document.getElementById('get-ready');

window.addEventListener('keydown', function (e) {
  game.paddle.keys[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
  game.paddle.keys[e.keyCode] = false;
});

window.addEventListener('keyup', function (e) {
  if(e.keyCode === 32 && game.isRunning === false) {
    game.startGame(canvas);
    game.isRunning = true;
    gameStart.style.display = 'none';
    getReady.style.display = 'block';
    canvas.style.display = 'block';
  }
});

window.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    document.location.reload();
  }
});

window.addEventListener('keyup', function(e) {
  if (e.keyCode === 49) {
    game.player.wins = 0;
  }
});

window.addEventListener('keyup', function(e) {
  if (e.keyCode === 50) {
    game.player.wins = 1;
    game.currentLevelCheck();
  }
});

window.addEventListener('keyup', function(e) {
  if (e.keyCode === 51) {
    game.player.wins = 2;
    game.currentLevelCheck();
  }
});

