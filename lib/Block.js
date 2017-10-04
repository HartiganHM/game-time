class Block {
	constructor (x, y, rStart, rEnd, pi, counterclockwise) {
		this.x = x;
		this.y = y;
		this.rStart = rStart;
		this.rEnd = rEnd;
		this.pi = pi;
		this.counterclockwise = counterclockwise;
		this.dx = 3;
		this.dy = 3;
	}

	draw (context) {
		context.beginPath();
		context.arc(this.x, this.y, this.rStart, this.rEnd, this.pi, this.clockwise);
		context.fill();
		return this;
	};

	move (canvas, paddle) {
		if (this.x + this.rStart > canvas.width || this.x - this.rStart < 0) {
			this.dx = -this.dx
		}

		if (this.y + this.rStart == paddle.y) {
			this.dy = -this.dy;
			console.log('hit');
		}

		if (this.y - this.rStart < 0) {
			this.dy = -this.dy
		} else if (this.y + this.rStart > canvas.height) {
			// alert("GAME OVER");
			document.location.reload();
		}

		this.x += this.dx;
		this.y += this.dy;

		return this;
	};

}

module.exports = Block;