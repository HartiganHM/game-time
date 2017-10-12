const assert = require('chai').assert;
const Player = require('../lib/Player.js');

let player;

beforeEach(() => {
  player = new Player(3, 0);
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

it('should lose a life after ball falls below paddle', function () {
  player.deathCheck();
  assert.equal(player.lives, 2);

});