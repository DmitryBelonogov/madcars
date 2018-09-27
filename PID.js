function PID(p, i, d) {
  this.target = 0;
  this.output = 0;
  this.errorSum = 0;
  this.setTurnings(p, i, d);
}

PID.prototype.setTurnings = function(p, i, d) {
  this.p = p;
  this.i = i;
  this.d = d;
};

PID.prototype.setTarget = function(value) {
  this.target = value;
};

PID.prototype.setOutputLimits = function(min, max) {
  this.min = min;
  this.max = max;
};

PID.prototype.run = function(input) {
  const error = this.target - input;
  const inputDiff = input - this.lastInput;

  this.errorSum = Math.max(
    this.min,
    Math.min(this.max, this.errorSum + this.i * error)
  );
  this.output = Math.max(
    this.min,
    Math.min(this.max, this.p * error + this.errorSum - this.d * inputDiff)
  );
  this.lastInput = input;

  return this.output;
};

module.exports = PID
