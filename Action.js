function Action() {
  this.children = [];
  this.oldAction = "";
  this.isBlocked = false
}

Action.prototype.init = function () {
  this.children.forEach(action => action.init && action.init())
}

Action.prototype.blocked = function () {
  return this.isBlocked;
};

Action.prototype.canExecute = function () {
  return this.children.length > 0;
};

Action.prototype.execute = function () {
  this.isBlocked = this.run()
};

Action.prototype.run = function () {
  return this.children.some(action => {
    if (action.canExecute()) {
      if (action.constructor.name != this.oldAction) {
        this.oldAction = action.constructor.name;
      }
      action.execute();
    }
    return action.blocked();
  });
};

Action.prototype.add = function (action) {
  this.children.push(action);
};

module.exports = Action;