var Block = require('./Block.js');
// var Ball = require('./Ball.js');
var Paddle = require('./Paddle.js');
var Blocks = require('./Blocks.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
// var firstBall = new Ball(150, 280, 5, 0, Math.PI * 2, false);
var firstBlock = new Block(150, 280, 5, 0, Math.PI * 2, false);
var paddle = new Paddle(canvas.width/ 2, canvas.height - 30, 70, 10);

var blocks = [ firstBlock ];
var blockArr = [];

window.addEventListener('keydown', function (e) {
	paddle.move(e);

});

function stack () {
	
	for (i = 0; i < 10; i++) {
		for (j = 0; j < 4; j++) {
			var brick = new Blocks(i * 90, (j * 30) + 50, 90, 30);
			blockArr.push(brick)
			console.log(blockArr);

		}
	}
	
}

function drawBricks (array) {
	array.forEach(function(brick) {
		brick.draw(context);
	}
)};

	stack();

requestAnimationFrame( function gameLoop () {
	//clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	//draw rectangles
	blocks.forEach( function(block) {
		block.move(canvas, paddle).draw(context);
	});
	paddle.draw(context);
	drawBricks(blockArr);
	
	requestAnimationFrame(gameLoop);
	
});


					







