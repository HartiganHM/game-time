const Game = require('./Game.js');
const canvas = document.getElementById('game');
const  gameStart = document.getElementById('game-start');
const context = canvas.getContext('2d');
const game = new Game(canvas, context, canvas.width, canvas.height);

window.addEventListener('keydown', function (e) {
  game.paddle.keys[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
  game.paddle.keys[e.keyCode] = false;
});

window.addEventListener('keyup', function (e) {
  if(e.keyCode == 32 && game.isRunning === false) {
    game.startGame(canvas);
    game.isRunning = true;
    gameStart.style.display = 'none';
    canvas.style.display = 'block';
  }
});

window.addEventListener('keyup', function(e) {
	if (e.keyCode === 13) {
		document.location.reload();
	}
})