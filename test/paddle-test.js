var assert = require('chai').assert;
var Paddle = require('../lib/Paddle.js');

let paddle;

beforeEach(() => {
  paddle = new Paddle(5, 5, 20, 10);
})

it('should be a function', function () {
  assert.isFunction(Paddle);
});

it('should have a starting x', function () {
  assert.equal(paddle.x, 5)
});

it('should have a starting y', function () {
  assert.equal(paddle.y, 5)
});

it('should have a width', function () {
  assert.equal(paddle.w, 20);
});

it('should have a height', function () {
  assert.equal(paddle.h, 10);
});

it('should have a speed by default', function () {
  assert.equal(paddle.speed, 5);

});

it('should have a friction by default', function () {
  assert.equal(paddle.friction, .98);

});

it('should have an x-velocity of 0 by default', function () {
  assert.equal(paddle.dx, 0)
});




