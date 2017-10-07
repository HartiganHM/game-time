class Ball {
	constructor (x, y, rStart, rEnd, pi, counterclockwise) {
		this.x = x;
		this.y = y;
		this.rStart = rStart;
		this.rEnd = rEnd;
		this.pi = pi;
		this.counterclockwise = counterclockwise;
		this.dx = 3;
		this.dy = -3;
	}

	draw (context) {
		context.beginPath();
		context.arc(this.x, this.y, this.rStart, this.rEnd, this.pi, this.clockwise);
		context.fill();
		return this;
	}

	move (canvas, paddle) {
		if (this.x + this.rStart > canvas.width || this.x - this.rStart < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.rStart == paddle.y) {
			if (this.x - this.rStart > paddle.x && this.x + this.rStart < paddle.x + paddle.w) {
				this.dy = -this.dy;
			}
		}

		if(this.y + this.dy < canvas.height - 700) {
    		this.dy = -this.dy;
}

		if (this.y - this.rStart < 0) {
			this.dy = -this.dy;
		} else if (this.y > canvas.height) {
			// document.location.reload();
		}

		this.x += this.dx;
		this.y += this.dy;

		return this;
	}

	collide (block){
		if (this.y - this.rStart == block.y + block.h) {
		console.log('whatever')
			if (this.x > block.x && this.x  < block.x + block.w) {
				this.dy = -this.dy;
			}
		}
		return this;
	}
}



module.exports = Ball;