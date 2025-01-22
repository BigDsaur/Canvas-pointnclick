import Player from "./player.js"
import Enemy from "./enemy.js"
import Projectile from "./Projectile.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set fixed canvas size
canvas.width = 800;
canvas.height = 800;

// Initialize game objects
const player = new Player(canvas.width / 2 - 25, canvas.height - 60);
const enemy = new Enemy(canvas.width / 2 - 25, 50);
const projectiles = [];

// Event listeners
document.addEventListener("keydown", (event) => player.handleKeyDown(event));
document.addEventListener("keyup", (event) => player.handleKeyUp(event));

canvas.addEventListener("click", (event) => {
    projectiles.push(player.shoot(event, canvas));
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player and draw
    player.update(canvas);
    player.draw(ctx);

    // Update and draw projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].update();
        projectiles[i].draw(ctx);

        // Check collision with enemy
        if (enemy.isHit(projectiles[i])) {
            enemy.takeDamage();
            projectiles.splice(i, 1);
        } else if (projectiles[i].outOfBounds(canvas)) {
            projectiles.splice(i, 1);
        }
    }

    // Update and draw enemy
    enemy.update(canvas);
    enemy.draw(ctx);

    requestAnimationFrame(gameLoop);
}


gameLoop();
