const assert = require('chai').assert;
const Player = require('../lib/Player.js');
const Ball = require('../lib/Ball.js');

let player;
let ball;

beforeEach(() => {
  player = new Player(3, 0);
  ball = new Ball(100, 700, 10, 0, Math.PI * 2, false);
});

it('should be a function', function () {
  assert.isFunction(Player);
});

it( 'should start out with three lives', function () {
   assert.equal(player.lives, 3);
});

it('should start with no wins by deafult', function() {  
  assert.equal(player.wins, 0);
});

it('should lose a life when passing the canvas bottom', function() {
	ball.dy = 40;
	assert.equal(ball.dy, 40);
	ball.move();
	player.deathCheck(ball, 720);
	assert.equal(player.lives, 2);
});