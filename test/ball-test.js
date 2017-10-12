const assert = require('chai').assert;
const Ball = require('../lib/Ball.js');

let ball;

beforeEach(() => {
  ball = new Ball(5, 200, 3, 5, 2, true)
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

it('should a radius start', function () {
  assert.equal(ball.rStart, 3);

});

it('should have a radius end', function () {
  assert.equal(ball.rEnd, 5);

});

it('should have a pi', function () {
  assert.equal(ball.pi, 2);

});

it('should have counterclockwise rotation', function () {
  assert.equal(ball.counterclockwise, true);

});

it('should have an x-velocity', function () {
  assert.equal(ball.dx, 0);

});

it('should have a y-velocity', function () {
  assert.equal(ball.dy, 0);

});





















