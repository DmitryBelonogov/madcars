function DeadLineAction(player, enemy, match) {
  this.player = player;
  this.enemy = enemy;
  this.match = match;
}

DeadLineAction.prototype.blocked = function () {
  return this.canExecute();
};

DeadLineAction.prototype.canExecute = function () {
  if (this.match.map === 5) return false
  if (this.match.map === 2 && this.player.type === 2) {
    return true;
  }
  //console.error(this.player.deadline);
  return (
    this.match.map != 5 && this.match.map != 6 && this.player.deadline > 100 && !this.player.isMapAction
  );
};

DeadLineAction.prototype.execute = function () {
  if (this.match.map === 2 && this.player.type === 2) {
    if (this.player.isLeft) {
      this.player.goRight();
    } else {
      this.player.goLeft();
    }
    return;
  }

  if (this.player.isLeftOf(this.enemy.getPosition())) {
    this.player.goLeft(true);
  } else {
    this.player.goRight(true);
  }
};

module.exports = DeadLineAction;