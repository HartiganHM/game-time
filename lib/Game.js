const Ball = require('./Ball.js');
const Paddle = require('./Paddle.js');
const SquarePiece = require('./SquarePiece.js');
const blueBrick = document.getElementById('blue-brick');

module.exports = class Game {
	constructor (canvas, context, width, height, score, lives) {
		this.blockArr = [];
		this.width = width;
		this.height = height;
		this.canvas = canvas;
		this.context = context;
		this.score = 0;
		this.lives = 3;
		this.ball = new Ball(150, 280, 5, 0, Math.PI * 2, false);
		this.paddle = new Paddle(this.width/ 2, this.height - 30, 70, 10);
	}

	stack () {
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 4; j++) {
				var brick = new SquarePiece(i * 90, (j * 30) + 50, 90, 30);
				this.blockArr.push(brick);
			}
		}
	}

	drawBricks (array, context) {
		array.forEach(function(brick) {
			brick.draw(context, blueBrick);
		}
	)}

	drawScore (context, score) {
    context.font = "24px Arial";
    context.fillText("Score: " + score, 20, 30);	
	}

	drawLives () {
    this.context.font = "24px Arial";
    this.context.fillText("Lives Left: " + this.lives, this.canvas.width - 150, 30);
	}

	scoreCheck () {
		this.score = -((this.blockArr.length-40) * 100); 
	}

		

	gameLoop () {
		this.context.clearRect(0, 0, this.width, this.height);
		this.ball.move(this.canvas, this.paddle).draw(this.context);
		this.paddle.move().edgeCheck(this.canvas).draw(this.context, blueBrick);
		this.drawBricks(this.blockArr, this.context);
		this.drawLives(this.context);
		this.drawScore(this.context, this.score);
		requestAnimationFrame(this.gameLoop.bind(this));
		this.blockArr.forEach((squareP, index) => {
			squareP.collide(this.ball, this.blockArr, index, this.score);	
			this.scoreCheck();
	
		})
	}

	startGame(canvas) {
		this.stack();
	
		requestAnimationFrame(this.gameLoop.bind(this));
	}	

};
		

	 
  

