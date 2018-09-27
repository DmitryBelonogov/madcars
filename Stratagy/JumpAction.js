function JumpAction(player, enemy, match) {
    this.player = player
    this.enemy = enemy
    this.match = match
}

JumpAction.prototype.init = function() {
    this.isJumped = false
    this.isRotated = false
}

JumpAction.prototype.blocked = function () {
    return this.canExecute()
}

JumpAction.prototype.canExecute = function () {
    return !this.player.isJumped &&
        this.player.type === 2 &&
        [2, 3].includes(this.match.map)
}

JumpAction.prototype.execute = function () {
    if(!this.isJumped) {
        this.jump()
    } else if(!this.isRotated) {
        this.rotate()
    } else {
        this.player.isJumped = true
        if(this.player.isLeft) {
            this.player.goRight(true)
        } else {
            this.player.goLeft(true)
        }
    }
}

JumpAction.prototype.jump = function() {
    if(this.player.angle < -110) {
        this.isJumped = true
    }

    if (this.player.isLeft) {
        this.player.goLeft()
    } else {
        this.player.goRight()
    }
}

JumpAction.prototype.rotate = function() {
    let angle = -205
    
    if(this.match.map === 4) {
        angle = -150
    } else if (this.match.map === 2) {
        angle = -120
    }
    if(this.player.angle < angle) {
        this.isRotated = true
    }


    if (this.player.isLeft) {
        this.player.goLeft(true)
    } else {
        this.player.goRight(true)
    }    
}

module.exports = JumpAction
