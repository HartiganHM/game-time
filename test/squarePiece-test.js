const assert = require('chai').assert;
const SquarePiece = require('../lib/SquarePiece.js');

let squarePiece;

beforeEach(() => {
  squarePiece = new SquarePiece(75, 300, 80, 20);
});


it('should be a function', function () {
  assert.isFunction(SquarePiece);

});

it('should have a starting x cordinate', function () {
  assert.equal(squarePiece.x, 75);

});

it('should have a starting y cordinate', function () {
  assert.equal(squarePiece.y, 300);

});

it('should have a width', function () {
assert.equal(squarePiece.w, 80);

});

it('should have a height', function () {
  assert.equal(squarePiece.h, 20);

});

it('should a register a collison when hit by ball', function () {
  squarePiece.x = 20;
  squarePiece.collide();
  assert.equal(squarePiece, true);

});