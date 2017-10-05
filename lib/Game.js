const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const SquarePiece = require('./SquarePiece.js');

module.exports = class Game {
	constructor (canvas, context, width, height) {
		this.blockArr = [];
		this.width = width;
		this.height = height;
		this.canvas = canvas;
		this.context = context;
		this.ball = new Ball(150, 280, 5, 0, Math.PI * 2, false);
		this.paddle = new Paddle(this.width/ 2, this.height - 30, 70, 10);
	}

	stack () {
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 4; j++) {
				var brick = new SquarePiece(i * 90, (j * 30) + 50, 90, 30);
				this.blockArr.push(brick)
			}
		}
	}

	drawBricks (array, context) {
		array.forEach(function(brick) {
			brick.draw(context);
		}
	)};

	gameLoop () {
		this.context.clearRect(0, 0, this.width, this.height);
		this.ball.move(this.canvas, this.paddle).draw(this.context);
		this.paddle.move().draw(this.context);
		this.drawBricks(this.blockArr, this.context);
		requestAnimationFrame(this.gameLoop.bind(this));
	};

	startGame(canvas) {
		this.stack();
		requestAnimationFrame(this.gameLoop.bind(this));
	}	
}
