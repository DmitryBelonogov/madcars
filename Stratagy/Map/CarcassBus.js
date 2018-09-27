function CarcassBus(player, enemy, match) {
    this.player = player
    this.enemy = enemy
    this.match = match
    this.init()
}

CarcassBus.prototype.init = function() {
    this.isLanded = false
    this.isJumped = false
    this.isDone = false
}

CarcassBus.prototype.blocked = function() {
    return this.canExecute()
}

CarcassBus.prototype.canExecute = function() {
    return this.match.map === 4 &&
        this.player.type === 2 &&
        (this.player.isLeft ? this.player.drive != 3 : this.player.drive != 1) &&
        this.enemy.getPosition().y > 350 &&
        !this.isDone
}

CarcassBus.prototype.execute = function() {
    if(!this.isLanded) {
        this.land()
    } else if(!this.isJumped) {
        this.jump()
    } else if(!this.isRotated) {
        this.rotate()
    } else {
        this.isDone = true
        this.player.canStand = false
        this.player.isJumped = true
        this.player.stop()
    }
}

CarcassBus.prototype.land = function() {
    if(this.player.angle < 5) {
        this.isLanded = true
        this.player.stop()
    } else {
        this.player.stop()
    }
}

CarcassBus.prototype.jump = function() {
    if(this.player.angle > 150) {
        this.isJumped = true
    }

    if(this.player.isLeft) {
        this.player.goRight(true)
    } else {
        this.player.goLeft(true)
    }
}

CarcassBus.prototype.rotate = function() {
    if(this.player.angle < 5 && this.player.angle > -5) {
        this.isRotated = true
        this.player.stop()
    } else {
        if(this.player.isLeft) {
            this.player.goRight(true)
        } else {
            this.player.goLeft(true)
        }
    }
}

module.exports = CarcassBus