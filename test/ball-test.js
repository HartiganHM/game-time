const assert = require('chai').assert;
const Ball = require('../lib/Ball.js');
const Paddle = require('../lib/Paddle.js');

let ball;
let paddle;

describe('Ball', function () {
  
  beforeEach(() => {
    ball = new Ball(5, 20, 10, 0, Math.PI * 2, false);
    paddle = new Paddle(100, 100, 120, 30);
  })

  it('should be a function', function () {
    assert.isFunction(Ball);
  });

  it('should have a starting x', function () {
    assert.equal(ball.x, 5);
  });

  it('should have a starting y', function () {
    assert.equal(ball.y, 20);
  });

  it('should a radius', function () {
    assert.equal(ball.radius, 10);
  });

  it('should have a starting angle', function () {
    assert.equal(ball.angleStart, 0);
  });

  it('should have a ending angle (with PI)', function () {
    assert.equal(ball.angleEnd, Math.PI * 2);
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

  it('should have the x-velocity added to the x on move', function() {
    ball.dx = 5;
    ball.move();
    assert.equal(ball.x, 10);
  });

  it('should have the y-velocity added to the y on move', function() {
    ball.dy = 5;
    ball.move();
    assert.equal(ball.y, 25);
  });

  it('should be able to take a negative x-velocity on move', function() {
    ball.dx = -5;
    ball.move();
    assert.equal(ball.x, 0);
  });

  it('should be able to take a negative y-velocity on move', function() {
    ball.dy = -5;
    ball.move();
    assert.equal(ball.y, 15);
  });

  it('should reverse y-velocity if it hits the paddle', function() {
    ball.x = 160;
    ball.dy = 70;
    ball.move();
    assert.equal(ball.y, 90);
    ball.paddleHit(paddle);
    assert.equal(ball.dy, -70);
  });

  it('should have an x-velocity of zero if it hits the middle of the paddle', function () {
    ball.x = 160;
    ball.dy = 70;
    ball.move();
    assert.equal(ball.y, 90);
    ball.dx = 5;
    ball.paddleHit(paddle);
    assert.equal(ball.dx, 0);
  });

  it('should have an x-velocity of -5 if it hits the left-most edge of the paddle', function () {
    ball.x = 112;
    ball.dy = 70;
    ball.move();
    assert.equal(ball.y, 90);
    ball.dx = 5;
    ball.paddleHit(paddle);
    assert.equal(ball.dx, -5);
  });

  it('should have an x-velocity of -2.5 if it hits the inner-left edge of the paddle', function () {
    ball.x = 136;
    ball.dy = 70;
    ball.move();
    assert.equal(ball.y, 90);
    ball.dx = 5;
    ball.paddleHit(paddle);
    assert.equal(ball.dx, -2.5);
  });

  it('should have an x-velocity of 5 if it hits the right-most edge of the paddle', function () {
    ball.x = 208;
    ball.dy = 70;
    ball.move();
    assert.equal(ball.y, 90);
    ball.dx = 1;
    ball.paddleHit(paddle);
    assert.equal(ball.dx, 5);
  });

  it('should have an x-velocity of 2.5 if it hits the inner-right edge of the paddle', function () {
    ball.x = 184;
    ball.dy = 70;
    ball.move();
    assert.equal(ball.y, 90);
    ball.dx = 1;
    ball.paddleHit(paddle);
    assert.equal(ball.dx, 2.5);
  });
})






















