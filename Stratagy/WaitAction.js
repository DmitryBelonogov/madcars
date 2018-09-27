function WaitAction(player) {
	this.player = player
}

WaitAction.prototype.blocked = function() {
	return true
}

WaitAction.prototype.canExecute = function() {
	return true
}

WaitAction.prototype.execute = function() {
	this.player.stop()
}

module.exports = WaitAction