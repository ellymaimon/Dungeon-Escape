// Player
console.log("player.js loaded!");

var player = {};

function Player(name, room) {
  this.name = name;
  this.level = 1;
  this.hp = 10;
  this.dead = false;
  this.mp = 20;
  this.ap = 1;
  this.sp = 1;
  this.spells = [];
  this.items = [];
  this.xp = 0;
  this.room = room;
}

Player.prototype.checkLoot = function(enemy) {
  const LOOTABLE_ITEMS = enemy.loot.length;
  var uniqueItem = false;

  while(!uniqueItem) {
    var randomNumber = rollDice(LOOTABLE_ITEMS);

    if(this.items.includes(enemy.loot[randomNumber])) {
      console.log("skip");
      console.log(enemy.loot[randomNumber]);
      continue;
    } else {
      this.items.push(enemy.loot[randomNumber]);
      console.log(enemy.loot[randomNumber]);
      uniqueItem = true;
    }
  }
}

function rollDice(maxNumber) {
  var roll = Math.floor(Math.random() * maxNumber);

  return roll;
}

Player.prototype.levelUp = function(level) {
  this.level += 1;
  this.xp = 0;
}

Player.prototype.checkDead = function() {
  if(this.hp === 0) {
    return true;
  } else {
    return false;
  }
}

Player.prototype.checkXP = function() {
  if(this.xp === 100) {
    this.levelUp();
    alertSuccess("Level Up! You are now level " + this.level);
  }
}

Player.prototype.hitSomething = function(mob) {
  const minAttack = (this.ap * .5);
  const maxAttack = this.ap;
  var rolld10 = (Math.floor((Math.random() * (maxAttack - minAttack) + minAttack)));
  var damage = this.ap * rolld10;
  if(miss()){
    damage = 0;
  }
  mob.hp -= damage;
}

Player.prototype.upgradeStats = function(item) {
  this.hp += item.healthBonus;
  this.mp += item.manaBonus;
  this.ap += item.attackBonus;
  this.sp += item.spellBonus;
}

function createNewPlayer(name) {
  player = new Player(name, roomMap.room1);
  saveGame(player);
}

function loadPlayer() {
  player = playerFromStorage();
}
