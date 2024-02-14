let bullets = [];
let enemies = [];
let enemyPos = 0
let score = 0
var time;
var enemySpawn;
var firstBullet = 0;
let difficulty = 0.5;
let difficultyLevel = 1;
let endGame = 0;
let shoot_sound;
let border_sound;

function preload() {
  shoot_sound = loadSound('spaceshooter.mp3');
  border_sound = loadSound('spaceshooter_border.mp3');
  destruct_sound = loadSound('destruction.mp3');
  
}

function setup() {
  createCanvas(400, 400);
  for (let i=0; i < 10000 ; i++){
    enemyPos = enemyPos - 125;
    let enemy = {
      x: random(0, 380),
      y: enemyPos,
      z: 0
    }
    enemies.push(enemy)
  }
}

var x1 = 200;
var x2 = 170;
var x3 = 230;

// player bounces
function draw() {
  background(51)
  if (keyIsDown(LEFT_ARROW)) {
    if (x1 > 0) {
      x1 -= 5;
      x2 -= 5;
      x3 -= 5;
  } // else play sound
    else if (x1 <= 0) {
      border_sound.play();
    }
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    if (x1 < width) {
      x1 += 5;
      x2 += 5;
      x3 += 5;
    } // else play sound
    else if (x1 >= width) {
      border_sound.play();
    }
  }
  triangle(x1, 370, x2, 400, x3, 400)
  for (let bullet of bullets){
    circle(bullet.x, bullet.y, 10)
    bullet.y -= 8;
  }
  for (let enemy of enemies) {
    fill("red")
    if (enemy.z == 0) {
      enemy.y += difficulty;
    } else if (enemy.z == 2) {
      enemies.splice(enemies.indexOf(enemy), 1); 
    } else {
      fill("black");
    }
    rect(enemy.x, enemy.y, 20)
    fill("white");
    if (enemy.y > 375) {
      fill("white");
      text("You Lose!", 150, 200);
      text("Refresh page to play again.", 85, 220);
      noLoop();
    }
  }
  
  for (let bullet of bullets) {
    if (bullet.y == 10) {
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  }
  
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 20) {
        enemy.z = 1;
        destruct_sound.play();
        setTimeout(() => {
            enemy.z = 2;
        }, 1000);
        bullets.splice(bullets.indexOf(bullet), 1);
        score += 1
        if (score == 5) {
          difficulty = 1;
          difficultyLevel = 2;
        }
        if (score == 15) {
          difficulty = 1.5;
          difficultyLevel = 3;
        }
        if (score == 25) {
          difficulty = 2;
          difficultyLevel = 4;
        }
        if (score >= 35) {
          difficulty = 2.5;
          difficultyLevel = 5;
        }
      }
    }
  }
  textSize(20)
  text("Score: " + score, 30, 30)
  text("Difficulty: " + difficultyLevel, 30, 60);
}

// bullets spawning on space
function keyPressed(){
  let bullet = {
    x: x1,
    y: 370
  }
  if (keyCode == 32) {
    if (endGame == 0) {
      if (firstBullet == 0) {
        shoot_sound.stop();
        shoot_sound.play();
        firstBullet = 1;
        bullets.push(bullet);
        time = millis();
      }
      if (firstBullet == 1) {
        if (millis() - time >= 400) {
          shoot_sound.stop();
          shoot_sound.play();
          bullets.push(bullet);
          time = millis();
        }
      }
    }
  }
}
// enemies
// collisions
// score
// lose game
