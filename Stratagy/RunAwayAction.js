const Const = require('./../Constants')

function RunAwayAction(player, enemy) {
  this.player = player;
  this.enemy = enemy;
}

RunAwayAction.prototype.blocked = function () {
  return this.canExecute();
};

RunAwayAction.prototype.canExecute = function () {
if(this.player.isLeftOf(this.enemy.getPosition())) {
  this.pos = this.player.isLeft ? this.player.wheels.front : this.player.wheels.back
} else {
  this.pos = this.player.isLeft ? this.player.wheels.back : this.player.wheels.front
}
  return this.enemy.getDistanceX(this.pos) < Const.offense.distance &&
    this.enemy.getPosition().y - this.player.getPosition().y > 10 &&
    this.player.isLeft ?
      (this.player.angle < this.enemy.angle * Const.defense.angle && this.enemy.angle > 30) :
      (this.player.angle > this.enemy.angle * Const.defense.angle * -1 && this.enemy.angle < -30)
};

RunAwayAction.prototype.execute = function () {
  this.player.isLeftOf(this.enemy.getPosition()) ?
    this.player.goLeft(true) : this.player.goRight(true);
};

module.exports = RunAwayAction;
