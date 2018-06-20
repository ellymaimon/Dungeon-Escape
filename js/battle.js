function startBattle(enemy) {
  hideCurrentScreen();
  showBattleScreen();
  rollInitiative(enemy);
  firstTurn(enemy);
}

function rollInitiative(enemy) {
  var outcome = Math.floor((Math.random() * 2) + 1);
  console.log(outcome);
  // 1 = player, 2 = enemy
  if (outcome === 1) {
    enemy.goesFirst = false;
  } else {
    enemy.goesFirst = true;
  }
}

function firstTurn(enemy) {
  if (enemy.goesFirst) {
    runEnemyTurn(enemy);
    setTimeout(function() { runPlayerTurn(); }, 4000);
  } else {
    runPlayerTurn();
  }
}

function runEnemyTurn(enemy) {
  setTimeout(function() { battleAlert(enemy.name + "'s turn!"); }, 1000);
  setTimeout(function() {
    enemy.enemyAttack();
    battleAnimationPlayer();
  }, 2000);
  setTimeout(function() { checkPlayerDead(); }, 4000);
}

function runPlayerTurn() {
  showBattleMenu();
  runMpCheck();
  battleAlert(player.name + "'s turn!");
}

function runPlayerAttack(enemy) {
  setTimeout(function() { 
    player.playerAttack(enemy); 
    battleAnimationEnemy();
  }, 0);
  setTimeout(function() { checkEnemyDead(player.currentEnemy); }, 1000);
}

function runMpCheck() {
  if (player.noMp()) {
    disableButton("#spell");
  }
}

function runPlayerSpell(enemy) {
  setTimeout(function() {
    player.playerCastSpell(enemy);
    battleAnimationEnemy();
  }, 0);
  setTimeout(function() { checkEnemyDead(player.currentEnemy); }, 1000);
}

function runPlayerHealthPotion() {
  setTimeout(function() {
    player.useHealthPotion();
    battleAnimationStatRestore();
  }, 0);
  setTimeout(function() { checkEnemyDead(player.currentEnemy); }, 1000);
}

function runPlayerManaPotion() {
  setTimeout(function() {
    player.useManaPotion();
    battleAnimationStatRestore();
  }, 0);
  setTimeout(function() { checkEnemyDead(player.currentEnemy); }, 1000);
}

function checkPlayerDead() {
  if (player.isDead()) {
    showDeathScreen();
    console.log("You lost!");
  } else {
    console.log("Still fightin!");
    runPlayerTurn();
  }
}

function checkEnemyDead(enemy) {
  if (enemy.isDead()) {
    animationEnemyDefeated();
    console.log("You won!");
  } else {
    console.log("Still fightin!");
    runEnemyTurn(enemy);
  }
}