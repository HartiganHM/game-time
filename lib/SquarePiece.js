class SquarePiece {
	constructor (x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	draw (context) {
		context.fillRect(this.x, this.y, this.w, this.h);
		return this;
	}

	collide(ball, blockArr, index) {
		if (ball.x > this.x && ball.x < this.x + this.w && ball.y > this.y && ball.y < this.y + this.h) {
			ball.dy = -ball.dy;
			blockArr.splice(index, 1);
		

		return true;

		}
		return ball;
	}

}

module.exports = SquarePiece;