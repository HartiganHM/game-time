class SquarePiece {
	constructor (x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	draw (context, image) {
		context.drawImage(image, this.x, this.y, this.w, this.h);
		return this;
	}

	collide(ball, blockArr, index) {
		if (ball.x > this.x && ball.x < this.x + this.w && ball.y + ball.rStart > this.y && ball.y - ball.rStart < this.y + this.h) {
			ball.dy = -ball.dy;
			blockArr.splice(index, 1);
			return true;
		} else if (ball.y > this.y && ball.y < this.y + this.h && ball.x + ball.rStart > this.x && ball.x - ball.rStart < this.x + this.w) {
			ball.dx = -ball.dx;
			blockArr.splice(index, 1);
			return true;
		}
	}

}



module.exports = SquarePiece;