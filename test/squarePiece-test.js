const assert = require('chai').assert;
const SquarePiece = require('../lib/SquarePiece.js');
const Ball = require('../lib/Ball.js');

let squarePiece;
let ball;

describe('Square Piece', function () {

  beforeEach(() => {
    squarePiece = new SquarePiece(100, 100, 40, 20);
    ball = new Ball(120, 120, 10, 0, Math.PI * 2, false);
  });

  it('should be a function', function () {
    assert.isFunction(SquarePiece);
  });

  it('should have a starting x cordinate', function () {
    assert.equal(squarePiece.x, 100);
  });

  it('should have a starting y cordinate', function () {
    assert.equal(squarePiece.y, 100);
  });

  it('should have a width', function () {
    assert.equal(squarePiece.w, 40);
  });

  it('should have a height', function () {
    assert.equal(squarePiece.h, 20);
  });

  it('should reverse ball y velocity when hit', function () {
    ball.dy = -10;
    assert.equal(ball.dy, -10);
    squarePiece.collide(ball);
    assert.equal(ball.dy, 10);
  });

  it('should reverse ball x velocity when hit', function () {
    let ball = new Ball(90, 110, 10, 0, Math.PI * 2, false);
    ball.dx = 10;
    assert.equal(ball.dx, 10);
    ball.move();
    assert.equal(ball.x, 100);
    squarePiece.collide(ball);
    assert.equal(ball.dx, -10);
  });
})
