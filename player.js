import Projectile from "./Projectile.js";

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 48;
        this.color = "blue";
        this.speed = 5;
        this.movingLeft = false;
        this.movingRight = false;
    }

    handleKeyDown(event) {
        if (event.key === "a" || event.key === "A") this.movingLeft = true;
        if (event.key === "d" || event.key === "D") this.movingRight = true;
    }

    handleKeyUp(event) {
        if (event.key === "a" || event.key === "A") this.movingLeft = false;
        if (event.key === "d" || event.key === "D") this.movingRight = false;
    }

    update(canvas) {
        if (this.movingLeft && this.x > 0) this.x -= this.speed;
        if (this.movingRight && this.x + this.width < canvas.width) this.x += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    shoot(event, canvas) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        return new Projectile(this.x + this.width / 2 - 2.5, this.y, mouseX, mouseY);
    }
}
