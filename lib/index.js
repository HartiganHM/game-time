var Block = require('./Block.js');
var Paddle = require('./Paddle.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var firstBlock = new Block(150, 280, 5, 0, Math.PI * 2, false);
var paddle = new Paddle(canvas.width/ 2, canvas.height - 30, 70, 10);

var blocks = [ firstBlock ];

	window.addEventListener('keydown', function (e) {
		paddle.move(e);
	})
requestAnimationFrame( function gameLoop () {
	//clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	//draw rectangles
	blocks.forEach( function(block) {
		block.move(canvas, paddle).draw(context);
	});
	paddle.draw(context);

	requestAnimationFrame(gameLoop);


	canvas.addEventListener('click', function (e) {
		var newBlock = new Block(e.offsetX, e.offsetY, 5, 0, Math.PI * 2, false);
		blocks.push(newBlock);
});

});