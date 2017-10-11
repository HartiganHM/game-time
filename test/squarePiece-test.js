const assert = require('chai').assert;
const SquarePiece = require('../lib/SquarePiece.js');

it('should be a function', function () {
  assert.isFunction(SquarePiece);

});

it('should have a starting x cordinate', function () {
  var squarePiece = new SquarePiece(75);
  assert.equal(squarePiece.x, 75);

});

it('should have a starting y cordinate', function () {
  var squarePiece = new SquarePiece(75, 300);
  assert.equal(squarePiece.y, 300);

});

it('should have a width', function () {
var squarePiece = new SquarePiece(75, 300, 80);
assert.equal(squarePiece.w, 80);

});

it('should have a height', function () {
  var squarePiece = new SquarePiece(75, 300, 80, 20);
  assert.equal(squarePiece.h, 20);

});