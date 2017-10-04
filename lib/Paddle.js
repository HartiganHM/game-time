const SquarePiece = require('./SquarePiece.js');

class Paddle extends SquarePiece {
	constructor (x, y, w, h) {
		super(...arguments);
	}

	move (keypress) {
		if (keypress.keyCode == '37'){
			this.x-= 30;
		} else if (keypress.keyCode == '39') {
			this.x+= 30;
		}
	}
}

module.exports = Paddle;