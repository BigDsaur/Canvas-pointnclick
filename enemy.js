export default class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = "green";
        this.health = 3;
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

            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText(`HP: ${this.health}`, this.x + 5, this.y - 10);
        }
    }
}
