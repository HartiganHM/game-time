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

	collide(ball) {
		if (ball.x > this.x && ball.x < this.x + this.w && ball.y > this.y && ball.y < this.y + this.h) {
			ball.dy = -ball.dy;
		console.log('fuck')
		return true;

		}
		return ball;
	}



}


// 

// collide (block) {
// 	    if (this.y > block.y && this.y < block.bottomEdge() && this.x > block.leftEdge() && this.x < block.rightEdge()) {
// 	      if (this.x === block.leftEdge() || this.x === block.rightEdge()) {
// 	        this.velocityX = -this.velocityX;
// 	      }
// 	      this.velocityY = -this.velocityY;
// 	      return true;
// 	    }
// 	  }
// 	}


// bracket[i]

//ball needs to hit square-piece
// y-rStart to detect colision with the bricks 
//xy-------------wy

//xh-------------wh
module.exports = SquarePiece;