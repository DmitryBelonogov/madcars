const Const = require('../Constants')

function RotateAction(player) {
  this.player = player;
}

RotateAction.prototype.blocked = function () {
  return this.canExecute();
};

RotateAction.prototype.canExecute = function () {
  return this.player.angle > Const.maxAngle || this.player.angle < Const.minAngle;
};

RotateAction.prototype.execute = function () {
  if (this.player.isLeft) {
    if (this.player.angle > Const.maxAngle) {
      this.player.goLeft(true)
    } else {
      this.player.goRight(true)
    }
  } else {
    if (this.player.angle > Const.maxAngle) {
      this.player.goRight(true)
    } else {
      this.player.goLeft(true)
    }
  }
};

module.exports = RotateAction;
