const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const coinSound = document.getElementById("coinSound");

let player = {
    x: 50, y: 300, width: 30, height: 30,
    velocityX: 0, velocityY: 0, speed: 4,
    jumpPower: -10, gravity: 0.5, onGround: false
};
let levelWidth = 1600; 
let cameraX = 0; 

let platforms = [
    { x: 0, y: 370, width: 1600, height: 30 },
    { x: 200, y: 300, width: 100, height: 10 },
    { x: 400, y: 250, width: 100, height: 10 },
    { x: 600, y: 200, width: 100, height: 10 },
    { x: 800, y: 150, width: 100, height: 10 },
    { x: 1000, y: 250, width: 100, height: 10 },
    { x: 1200, y: 200, width: 100, height: 10 },
    { x: 1400, y: 150, width: 100, height: 10 }
];

let coins = [
    { x: 220, y: 270, collected: false },
    { x: 420, y: 220, collected: false },
    { x: 620, y: 170, collected: false },
    { x: 820, y: 120, collected: false },
    { x: 1020, y: 220, collected: false },
    { x: 1220, y: 170, collected: false },
    { x: 1420, y: 120, collected: false }
];

let flag = { x: 1500, y: 110, width: 20, height: 40 };
let keys = {};
let score = 0;

document.addEventListener("keydown", (event) => keys[event.code] = true);
document.addEventListener("keyup", (event) => keys[event.code] = false);

function update() {
    if (keys["ArrowRight"]) player.velocityX = player.speed;
    else if (keys["ArrowLeft"]) player.velocityX = -player.speed;
    else player.velocityX = 0;

    if (keys["Space"] && player.onGround) {
        player.velocityY = player.jumpPower;
        player.onGround = false;
    }

    player.velocityY += player.gravity;
    player.x += player.velocityX;
    player.y += player.velocityY;

    player.onGround = false;
    for (let platform of platforms) {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height - player.velocityY <= platform.y
        ) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.onGround = true;
        }
    }

    coins.forEach((coin, index) => {
        if (
            !coin.collected &&
            player.x < coin.x + 20 &&
            player.x + player.width > coin.x &&
            player.y < coin.y + 20 &&
            player.y + player.height > coin.y
        ) {
            coins[index].collected = true;
            score++;
            document.getElementById("score").innerText = "Score: " + score;
            coinSound.play();
        }
    });

    if (
        player.x < flag.x + flag.width &&
        player.x + player.width > flag.x &&
        player.y < flag.y + flag.height &&
        player.y + player.height > flag.y
    ) {
        alert("you won!!! score: " + score);
        document.location.reload();
    }

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > levelWidth) player.x = levelWidth - player.width;
    if (player.y > canvas.height) {
        alert("game over n00b!");
        document.location.reload();
    }

    cameraX = Math.max(0, Math.min(player.x - canvas.width / 2, levelWidth - canvas.width));
    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(player.x - cameraX, player.y, player.width, player.height);

    ctx.fillStyle = "green";
    platforms.forEach(platform =>
        ctx.fillRect(platform.x - cameraX, platform.y, platform.width, platform.height)
    );

    ctx.fillStyle = "yellow";
    coins.forEach(coin => {
        if (!coin.collected) {
            ctx.beginPath();
            ctx.arc(coin.x - cameraX + 10, coin.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    ctx.fillStyle = "white";
    ctx.fillRect(flag.x - cameraX, flag.y, flag.width, flag.height);
}

update();
