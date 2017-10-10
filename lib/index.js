const Game = require('./Game.js');
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(canvas, context, canvas.width, canvas.height);

window.addEventListener('keydown', function (e) {
  game.paddle.keys[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
  game.paddle.keys[e.keyCode] = false;
});

window.addEventListener('keyup', function (e) {
  if(e.keyCode == 32) {
    game.startGame(canvas);
    canvas.style.display = 'block';
  }
});


