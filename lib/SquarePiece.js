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
		if (ball.x - ball.rStart > this.x && ball.x + ball.rStart < this.x + this.w && ball.y - ball.rStart === this.y + this.h) {
			ball.dy = -ball.dy;
			blockArr.splice(index, 1);
			return true;
			} else if (ball.y - ball.rStart > this.y && ball.y + ball.rStart < this.y + this.h && ball.y + ball.rStart === this.y) {
					ball.dy = -ball.dy;
				blockArr.splice(index, 1);
				return true;
	}

}


}

module.exports = SquarePiece;