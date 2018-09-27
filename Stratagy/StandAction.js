const PID = require("../Utils").PID;

function StandAction(player, enemy, match) {
  this.player = player;
  this.enemy = enemy;
  this.match = match;
  this.init()
}

StandAction.prototype.init = function() {
  this.targetAngle = 76.4;
  this.isHold = false;

  if(this.match.map === 2) {
    this.angle = 105
  } else if(this.match.map === 3) {
    this.angle = 130
  } else if(this.match.map === 4) {
    this.angle = 155
  } else {
    this.angle = this.targetAngle
  }

  if(this.player.type != 2 && this.match.map === 6) {
    this.targetAngle = 65
  }
}

StandAction.prototype.blocked = function () {
  return this.canExecute();
};

StandAction.prototype.canExecute = function () {
  return this.player.canStand &&
    (this.player.type === 2 || this.match.map === 6)
};

StandAction.prototype.execute = function () {
  if(this.player.isJumped && this.angle > this.targetAngle) {
    this.angle -= 0.25
  }

  this.player.holdAngle(this.player.isJumped ? this.angle : this.targetAngle)
};

module.exports = StandAction;