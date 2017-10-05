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

}

module.exports = SquarePiece;