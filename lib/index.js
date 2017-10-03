var Block = require('./Block.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var firstBlock = new Block(150, 280, 5, 0, Math.PI * 2, false);

var blocks = [ firstBlock ];

requestAnimationFrame( function gameLoop () {
	//clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	//draw rectangles
	blocks.forEach( function(block) {
		block.move(canvas).draw(context);
	});

	requestAnimationFrame(gameLoop);

	canvas.addEventListener('click', function (e) {
		var newBlock = new Block(e.offsetX, e.offsetY, 5, 0, Math.PI * 2, false);
		blocks.push(newBlock);
});

});