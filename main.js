const Action = require("./Action");
const RotateAction = require("./Stratagy/RotateAction");
const OffenseAction = require("./Stratagy/OffenseAction");
const WaitAction = require("./Stratagy/WaitAction");
const DeadLineAction = require("./Stratagy/DeadLineAction");
const BreakDistanceAction = require("./Stratagy/BreakDistanceAction");


const PillCarcassMap = require('./Stratagy/Map/PillCarcassMap')

const mapActions = new Action()


const Car = require("./car");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let tick = 0;
let deadline_position = 0;

const player = new Car();

const enemy = new Car();

const mainActions = new Action();

const match = {
  playerLives: 0,
  enemyLives: 0,
  map: 0,
  wheels: false
};

readline.on("line", line => getConfig(JSON.parse(line)));

function getConfig(config) {
  config.type === "new_match" && nextMatch(config.params);
  config.type === "tick" && nextTick(config.params);
}

function updateBorders() {
  if(match.map === 5) {
    player.borders.left = 300
    player.borders.right = 900
  } else if(match.map === 4 && player.isJumped) {
    player.borders.left = 400
    player.borders.right = 700
  } else {
    player.borders.left = -9999
    player.borders.right = 9999
  }
}
function nextMatch(params) {
  match.playerLives = params.my_lives;
  match.enemyLives = params.enemy_lives;
  match.map = params.proto_map.external_id;
  match.isLanded = false;
  match.backWheelRadius = params.proto_car.rear_wheel_radius;
  match.wheels = !!params.proto_car.squared_wheels;
  player.setSpeed(params.proto_car.max_speed * (match.wheels ? 0.5 : 1));
  player.isLanded = false;
  player.isJumped = false;
  player.isMotionless = false;
  player.hightPosition = 0;
  player.type = params.proto_car.external_id;
  player.speed = params.proto_car.max_speed
  player.drive = params.proto_car.drive
  player.canStand = true
  updateBorders()
  tick = 0;
  mainActions.init()
}

function updateMotion() {
  if (player.getDistanceX(enemy.getPosition()) < 250) {
    player.setMotion()
  }
}

function nextTick(params) {
  tick += 1;

  updateCars(params);

  if (tick === 1) {
    enemy.saveLastPosition();
    player.saveLastPosition();
    player.stop();
  } else {
    if (tick % 160 === 0) {
      updateMotion();
    }
    mainActions.run();
  }
}

const JumpAction = require("./Stratagy/JumpAction");
const LandAction = require("./Stratagy/LandAction");
const StandAction = require("./Stratagy/StandAction");
const RunAwayAction = require("./Stratagy/RunAwayAction");

mapActions.add(new PillCarcassMap(player, match))
mapActions.add(new CarcassBus(player, enemy, match));

mainActions.add(new LandAction(player, match));
mainActions.add(mapActions)
mainActions.add(new JumpAction(player, enemy, match));
mainActions.add(new StandAction(player, enemy, match));
mainActions.add(new RotateAction(player));
mainActions.add(new DeadLineAction(player, enemy, match));
mainActions.add(new RunAwayAction(player, enemy));
mainActions.add(new BreakDistanceAction(player, enemy));
mainActions.add(new OffenseAction(player, enemy, match));
mainActions.add(new WaitAction(player));

function getAngle(angle, isLeft) {
  let res = (angle * isLeft * 180) / Math.PI;
  if(player.isJumped) {
    res += 360
  }
  while (res > 360) res -= 360;
  while (res < -360) res += 360;
  
  return res;
}

function updateCars(params) {
  deadline_position = params.deadline_position;

  player.setAngle(getAngle(params.my_car[1], params.my_car[2]));
  player.position.x = params.my_car[0][0];
  player.position.y = params.my_car[0][1];
  player.isLeft = params.my_car[2] === 1 ? true : false;
  player.wheels.back.x = params.my_car[3][0];
  player.wheels.back.y = params.my_car[3][1];
  player.wheels.front.x = params.my_car[4][0];
  player.wheels.front.y = params.my_car[4][1];

  player.deadline = deadline_position;
  match.deadline = deadline_position;

  enemy.setAngle(getAngle(params.enemy_car[1], params.enemy_car[2]));
  enemy.position.x = params.enemy_car[0][0];
  enemy.position.y = params.enemy_car[0][1];
  enemy.isLeft = params.enemy_car[2] === 1 ? true : false;
  enemy.wheels.back.x = params.enemy_car[3][0];
  enemy.wheels.back.y = params.enemy_car[3][1];
  enemy.wheels.front.x = params.enemy_car[4][0];
  enemy.wheels.front.y = params.enemy_car[4][1];
}
