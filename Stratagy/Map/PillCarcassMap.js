function PillCarcassMap(player, match) {
    this.player = player;
    this.match = match;
    this.init();
}

PillCarcassMap.prototype.init = function () {
    this.isOverlocked = false;
    this.isJumped = false;
    this.isDone = false;
};

PillCarcassMap.prototype.blocked = function () {
    return this.canExecute();
};

PillCarcassMap.prototype.canExecute = function () {
    const isJumpMap = this.match.map === 4 ||
        this.match.map === 3 ||
        this.match.map === 2

    const isGoodCar = !this.match.wheel &&
        this.player.speed >= 70 &&
        (this.player.drive != this.player.isLeft ? 1 : 2)

    return (
        isJumpMap &&
        !this.isDone &&
        isGoodCar
    );
};

PillCarcassMap.prototype.execute = function () {
    if (!this.isOverlocked) this.overclock();
    else
    if (!this.isJumped) this.jump();
    else {
        this.isDone = true;
        this.player.stop();
        this.player.borders = {
            left: 400,
            right: 800
        };
        this.player.isMapAction = true;
    }
};

PillCarcassMap.prototype.jump = function () {
    if (this.player.isLeft) {
        this.player.goLeft(true);
    } else {
        this.player.goRight(true);
    }
    this.isJumped = this.player.isLeft ?
        this.player.getPosition().x > 200 && this.player.getPosition().y > 400 :
        this.player.getPosition().x < 1000 && this.player.getPosition().y > 400;
};

PillCarcassMap.prototype.overclock = function () {
    this.player.isLeft ? this.player.goRight(true) : this.player.goLeft(true);
    this.isOverlocked = this.player.isLeft ?
        this.player.getPosition().x > 470 :
        this.player.getPosition().x < 730;
};

module.exports = PillCarcassMap;