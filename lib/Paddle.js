class Paddle {
	constructor (x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}	

	draw (context){
		context.fillRect(this.x, this.y, this.w, this.h);
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