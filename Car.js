const PID = require("./PID");

function Car() {
  this.angle = 0;
  this.oldAngle = 0;
  this.position = {
    x: 0,
    y: 0
  };
  this.wheels = {
    back: {
      x: 0,
      y: 0
    },
    front: {
      x: 0,
      y: 0
    }
  };
  this.borders = {
    left: -9999,
    right: 9999
  };
  this.lastPosition = 0;
  this.isMotionless = false;
  this.motionlessCount = 0;
  this.runTickCount = 0;
  this.runTick = 0;
  this.hightPosition = 0;
  this.angleSpeed = 0;

  this.state = "";
  this.setPID()
}

Car.prototype.setPID = function() {
  this.pid = new PID(0.055, 0, 0.3)
  this.pid.setOutputLimits(-2, 2)
}

Car.prototype.holdAngle = function (angle) {
  this.pid.setTarget(angle)
  const dir = this.pid.run(this.angle)

  if(this.isLeft) {
    if(dir > 0.5) {
      this.goRight(true)
    } else if(dir < 0.5) {
      this.goLeft(true)
    } else {
      this.stop()
    }
  } else {
    if(dir > 0.5) {
      this.goLeft(true)
    } else if(dir < 0.5) {
      this.goRight(true)
    } else {
      this.stop()
    }
  }
}

Car.prototype.inBorders = function () {
  return this.position.x < this.borders.right && this.position.x > this.borders.left
}

Car.prototype.getPosition = function () {
  return this.position;
};

Car.prototype.getDistance = function (pos) {
  return Math.hypot(this.position.x - pos.x, this.position.y - pos.y);
};

Car.prototype.getDistanceX = function (pos) {
  return Math.abs(this.position.x - pos.x);
};

Car.prototype.isLeftOf = function (pos) {
  return this.position.x < pos.x;
};

Car.prototype.setSpeed = function (speed) {
  if (speed >= 90) {
    this.runTickCount = 4;
  } else if (speed <= 60) {
    this.runTickCount = 0;
  } else {
    this.runTickCount = 1;
  }
  this.runTick = this.runTickCount;
};

Car.prototype.setAngle = function(angle) {
  this.oldAngle = this.angle;
  this.angle = angle
}

Car.prototype.getAngleSpeed = function () {
  const result = Math.abs(this.oldAngle - this.angle);
  return result;
};

Car.prototype.getPosition = function () {
  return {
    x: (this.wheels.back.x + this.wheels.front.x) / 2,
    y: (this.wheels.back.y + this.wheels.front.y) / 2
  };
};

Car.prototype.saveLastPosition = function () {
  this.lastPosition = this.getPosition().x;
};

Car.prototype.setMotion = function () {
  this.isMotionless = Math.abs(this.position.x - this.lastPosition) < 100;
  this.saveLastPosition();

  if (this.isMotionless) {
    this.motionlessCount = 30;
  }
};

Car.prototype.updateMotion = function () {
  this.motionlessCount -= 1;
  if (this.motionlessCount === 0) {
    this.isMotionless = false;
  }
}

Car.prototype.isRunTick = function (isSlow) {
  this.runTickCount -= 1;
  if (this.runTickCount <= isSlow ? -5 : 0) {
    this.runTickCount = this.runTick;
    return true;
  } else {
    return false;
  }
};

Car.prototype.stop = function () {
  console.log('{"command":"stop"}');
};

Car.prototype.goRight = function (isMax = false) {
  if (isMax) {
    this.command("right");
  } else {
    if (this.isRunTick(false)) {
      this.command("right");
    } else {
      this.command("stop");
    }
  }
};

Car.prototype.goLeft = function (isMax = false) {
  if (isMax) {
    this.command("left");
  } else {
    if (this.isRunTick(false)) {
      this.command("left");
    } else {
      this.command("stop");
    }
  }
};

Car.prototype.command = function (direction) {
  console.log(`{"command":"${direction}"}`);
};

module.exports = Car;
