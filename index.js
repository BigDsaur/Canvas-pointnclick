const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set fixed canvas size
canvas.width = 800;
canvas.height = 800;

// Player settings
const player = {
    x: canvas.width / 2 - 25, // Center horizontally
    y: canvas.height - 60, // Near bottom
    width: 50,
    height: 48,
    color: "blue",
    speed: 8,
    movingLeft: false,
    movingRight: false
};

const projectiles = [];

// Keyboard event listeners
document.addEventListener("keydown", (event) => {
    if (event.key === "a" || event.key === "A") player.movingLeft = true;
    if (event.key === "d" || event.key === "D") player.movingRight = true;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "a" || event.key === "A") player.movingLeft = false;
    if (event.key === "d" || event.key === "D") player.movingRight = false;
});

// Mouse click to shoot projectile
canvas.addEventListener("click", (event) => {
    // Get canvas position relative to the window
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate direction
    const angle = Math.atan2(mouseY - player.y, mouseX - (player.x + player.width / 2));
    const speed = 2;
    
    projectiles.push({
        x: player.x + player.width / 2, // Shoot from the center of the player
        y: player.y,
        width: 5,
        height: 10,
        color: "red",
        velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        }
    });
});

function update() {
    // Move player left or right
    if (player.movingLeft && player.x > 0) player.x -= player.speed;
    if (player.movingRight && player.x + player.width < canvas.width) player.x += player.speed;

    // Update projectiles
    for (let i = 0; i < projectiles.length; i++) {
        const p = projectiles[i];
        p.x += p.velocity.x;
        p.y += p.velocity.y;

        // Remove projectile if it leaves the screen
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player (rectangle)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw projectiles
    projectiles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
