const Const = require('../Constants')

function OffenseAction(player, enemy, match) {
  this.player = player;
  this.enemy = enemy;
  this.match = match;
}

OffenseAction.prototype.blocked = function () {
  return this.canExecute();
};

OffenseAction.prototype.canExecute = function () {
  return !this.player.isMotionless &&
    Math.abs(this.player.getPosition().y - this.enemy.getPosition().y) < 250;
};

OffenseAction.prototype.execute = function () {
  this.player.isLeftOf(this.enemy.getPosition()) ?
    this.player.goRight(true) : this.player.goLeft(true);
};

OffenseAction.prototype.attackWheel = function (){
  this.player.stop()
}

module.exports = OffenseAction;
