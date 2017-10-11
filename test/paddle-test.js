var assert = require('chai').assert;
var Paddle = require('../lib/Paddle.js');



it('should be a function', function () {
  assert.isFunction(Paddle);

});

it('should have a starting x', function () {
  var paddle = new Paddle(5);
  assert.equal(paddle.x, 5)
});

it('should have a starting y', function () {
  var paddle = new Paddle(5, 5);
  assert.equal(paddle.y, 5)
});

it('should have a width', function () {
  var paddle = new Paddle(5, 5, 20);
  assert.equal(paddle.w, 20);
});

it('should have a height', function () {
  var paddle = new Paddle(5, 5, 20, 10);
  assert.equal(paddle.h, 10);
});

it('should have a speed', function () {
  var paddle = new Paddle(5, 5, 20, 10);
 assert.equal(paddle.speed, 5);

});

it('should have a friction', function () {
  var paddle = new Paddle(5, 5, 20, 10);
  assert.equal(paddle.friction, .98);

});

it('should have an x-velocity', function () {
  var paddle = new Paddle(5, 5, 20, 10);
  assert.equal(paddle.dx, 0)
});


