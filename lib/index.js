const Game = require('./Game.js');
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(canvas, context, canvas.width, canvas.height);

window.addEventListener('keydown', function (e) {
	game.paddle.move(e, canvas);
});

game.startGame(canvas);