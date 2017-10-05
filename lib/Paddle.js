const SquarePiece = require('./SquarePiece.js');

class Paddle extends SquarePiece {
	constructor (x, y, w, h) {
		super(...arguments);
		this.speed = 10;
		this.dx = 0;
		this.friction = 0.98;
		this.keys = [];
	}

	move (canvas) {
		if (this.keys[37]) {
			if (this.dx > -this.speed) {
				this.dx--;
			}
		}

		if (this.keys[39]) {
			if (this.dx < this.speed) {
				this.dx++;
			}
		}
		this.dx *= this.friction;
		this.x += this.dx
		return this;
	}

	edgeCheck(canvas) {
		if (this.x + this.w >= canvas.width) {
			this.x = canvas.width - this.w;
		} else if (this.x <= 0) {
			this.x = 0;
		}
		return this;
	}
}

module.exports = Paddle;