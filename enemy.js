export default class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = "green";
        this.health = 5;
        this.speed = 2; // Speed of movement
        this.direction = 1; // 1 means moving right, -1 means moving left
    }

    update(canvas) {
        // Move the enemy left and right
        this.x += this.speed * this.direction;

        // Bounce off the left and right walls
        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.direction *= -1; // Reverse direction
        }
    }

    takeDamage() {
        this.health -= 1;
        console.log(`Enemy hit! Health: ${this.health}`);
    }

    isHit(projectile) {
        return (
            this.health > 0 &&
            projectile.x < this.x + this.width &&
            projectile.x + projectile.width > this.x &&
            projectile.y < this.y + this.height &&
            projectile.y + projectile.height > this.y
        );
    }

    draw(ctx) {
        if (this.health > 0) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
