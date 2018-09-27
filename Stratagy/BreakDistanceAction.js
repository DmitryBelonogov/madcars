function BreakDistanceAction(player, enemy) {
  this.player = player;
  this.enemy = enemy;
}

BreakDistanceAction.prototype.blocked = function () {
  return this.canExecute();
};

BreakDistanceAction.prototype.canExecute = function () {
  return this.player.isMotionless
};

BreakDistanceAction.prototype.execute = function () {
  this.player.updateMotion()

  if (this.player.isLeftOf(this.enemy.getPosition())) {
    this.player.goLeft();
  } else {
    this.player.goRight();
  }
};

module.exports = BreakDistanceAction;