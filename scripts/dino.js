const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = {
  x: 50, y: 150, width: 30, height: 30,
  velocityY: 0, gravity: 0.6, isJumping: false
};

let obstacles = [];
let score = 0;
let gameRunning = true;
let speed = 3;

function drawdino() {
  ctx.fillStyle = "black";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawobstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dino.velocityY += dino.gravity;
  dino.y += dino.velocityY;
  if (dino.y > 150) {
    dino.y = 150;
    dino.velocityY = 0;
    dino.isJumping = false;
  }

  obstacles.forEach(obstacle => {
    obstacle.x -= speed;
  });

  if (obstacles.length > 0 && obstacles[0].x + obstacles[0].width < 0) {
    obstacles.shift();
    score++;
  }

  obstacles.forEach(obstacle => {
    if (
      dino.x < obstacle.x + obstacle.width &&
      dino.x + dino.width > obstacle.x &&
      dino.y < obstacle.y + obstacle.height &&
      dino.y + dino.height > obstacle.y
    ) {
      gameRunning = false;
      alert("you lost noob. score: " + score);
      document.location.reload();
    }
  });

  if (Math.random() < 0.01) {
    obstacles.push({ x: canvas.width, y: 160, width: 20, height: 40 });
  }

  drawdino();
  drawobstacles();

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("score: " + score, 10, 20);

  requestAnimationFrame(update);
}

document.addEventListener("keydown", event => {
  if (event.code === "Space" && !dino.isJumping) {
    dino.velocityY = -10;
    dino.isJumping = true;
  }
});

update();
