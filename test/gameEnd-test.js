const assert = require('chai').assert;
const GameEnd = require('../lib/GameEnd.js');

it('should be a function', function () {
  assert.isFunction(GameEnd);

});

it('should have a starting x cordinate', function () {
  var gameEnd = new GameEnd(20);
  assert.equal(gameEnd.x, 20);

});

it('should have a starting y cordinate', function () {
  var gameEnd = new GameEnd(20, 100);
  assert.equal(gameEnd.y, 100);

});

it('should have a width', function () {
  var gameEnd = new GameEnd(20, 100, 500);
  assert.equal(gameEnd.w, 500);

});

it('should have a height', function () {
  var gameEnd = new GameEnd(20, 100, 500, 400);
  assert.equal(gameEnd.h, 400);

});

