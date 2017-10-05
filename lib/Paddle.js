const SquarePiece = require('./SquarePiece.js');

class Paddle extends SquarePiece {
	constructor (x, y, w, h) {
		super(...arguments);
		this.speed = 10;
		this.dx = 0;
		this.friction = 0.98;
		this.keys = [];
	}

	move () {
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
		// if (keypress.keyCode == '37' && this.dx > -this.speed && this.x > 0){
		// 	this.dx--;
		// 	// this.x-= 30;
		// } else if (keypress.keyCode == '39' && this.dx < this.speed && this.x + this.w < canvas.width) {
		// 	this.dx++;
		// 	// this.x+= 30;
		// }
		this.dx *= this.friction;
		this.x += this.dx
		return this;
	}
}

module.exports = Paddle;