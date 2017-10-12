const assert = require('chai').assert;
const Ball = require('../lib/Ball.js');

let ball;

beforeEach(() => {
  ball = new Ball(5, 200, 3, 5, 2, false)
})

it('should be a function', function () {
  assert.isFunction(Ball);
});

it('should have a starting x', function () {
  assert.equal(ball.x, 5);
});

it('should have a starting y', function () {
  assert.equal(ball.y, 200);
});

it('should a radius', function () {
  assert.equal(ball.rStart, 3);
});

it('should have a starting angle', function () {
  assert.equal(ball.rEnd, 5);
});

it('should have a ending angle', function () {
  assert.equal(ball.pi, 2);
});

it('should take a boolean for the counterclockwise argument', function () {
  assert.equal(ball.counterclockwise, false);
});

it('should have a default x-velocity of 0', function () {
  assert.equal(ball.dx, 0);
});

it('should have a default y-velocity of 0', function () {
  assert.equal(ball.dy, 0);
});





















