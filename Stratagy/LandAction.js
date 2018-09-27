const PID = require("../Utils").PID;

function LandAction(player, match) {
  this.player = player;
  this.match = match;

  this.pid = new PID(0.055, 0, 0.3);
  this.pid.setOutputLimits(-2, 2);
  this.pid.setTarget(76);
}

LandAction.prototype.blocked = function () {
  return this.canExecute();
};

LandAction.prototype.canExecute = function () {
  //return true;
  return !this.player.isLanded;
};

LandAction.prototype.checkLand = function () {
  const isNeedLand = this.player.type === 2 || this.match.map === 6;

  let landDist = 125;

  if (isNeedLand) {
    if (this.match.map === 6) {
      landDist = 235;
    } else {
      landDist = 150;
    }
  }

  return this.player.wheels.back.y < landDist;
};

LandAction.prototype.execute = function () {
  if (this.checkLand()) {
    this.player.isLanded = true;
    this.match.isLanded = true;
    return;
  }


  const isJumpMap = this.match.map === 4 ||
    this.match.map === 3 ||
    this.match.map === 2

  const isGoodCar = !this.match.wheel &&
    this.player.speed >= 70 &&
    (this.player.drive != this.player.isLeft ? 1 : 2)

  if (isJumpMap) {
    this.player.stop()
    return
  }

  const isNeedLand = (this.player.type === 2 || this.match.map === 6)

  if (!isNeedLand) {
    this.player.stop();
    return;
  }

  const dir = this.pid.run(this.player.angle);

  if (this.player.isLeft) {
    if (dir > 0.5) {
      this.player.goRight(true);
    } else if (dir < 0.5) {
      this.player.goLeft(true);
    } else {
      this.player.goLeft(true);
    }
  } else {
    if (dir > 0.5) {
      this.player.goLeft(true);
    } else if (dir < 0.5) {
      this.player.goRight(true);
    } else {
      this.player.goRight(true);
    }
  }
};

module.exports = LandAction;