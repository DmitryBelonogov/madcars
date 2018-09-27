function IslandHoleMap(player, match) {
  this.player = player;
  this.match = match;
}

IslandHoleMap.prototype.blocked = function() {
  console.error("IslandHoleMap");
  return this.canExecute();
};

IslandHoleMap.prototype.canExecute = function() {
  console.error("IslandHoleMap");
  return true;
};

IslandHoleMap.prototype.execute = function() {
  console.error("IslandHoleMap");
  if (this.player.isLeft) {
    if (this.player.getDistance({ x: 200, y: 200 }) > 50) {
      this.player.goLeft();
    } else {
      this.player.stop();
    }
  } else {
    if (this.player.getDistance({ x: 1000, y: 200 }) > 50) {
      this.player.goRight();
    } else {
      this.player.stop();
    }
  }
};

module.exports = IslandHoleMap;
