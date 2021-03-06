import { Constants } from "../assets/utils/Constants";
import { Actor } from "./Actor";
import { Bar } from "./Bar";

export class Ball implements Actor {
    position: { x: number; y: number; };
    ctx: CanvasRenderingContext2D;
    speed: { dx: number, dy: number };
    playerBar: Bar;

    constructor(position, ctx: CanvasRenderingContext2D, playerBar: Bar) {
        this.position = { x: position.x, y: position.y };
        this.ctx = ctx;
        this.speed = { dx: 0, dy: 0 };
        this.playerBar = playerBar;
    }
    update(delta: number, canvasWidth, canvasHeight) {
        // canvas limits
        if (this.position.x + this.speed.dx >= canvasWidth
            || this.position.x + this.speed.dx <= 0)
            this.speed.dx = -this.speed.dx;
        if (this.position.y + this.speed.dy >= canvasHeight
            || this.position.y + this.speed.dy <= 0)
            this.speed.dy = -this.speed.dy;

        // new bar collider
        if (this.position.x > this.playerBar.position.x
            && this.position.x < this.playerBar.position.x + this.playerBar.width
            && this.position.y > this.playerBar.position.y
            && this.position.y < this.playerBar.position.y + this.playerBar.height) {
            this.speed.dx = 8 * ((this.position.x - (this.playerBar.position.x + 80 / 2)) / 80);
            this.speed.dy = -this.speed.dy;
        }

        // if ball reaches bottom, game over
        if (this.position.y >= canvasHeight - 10) {
            this.speed.dx = 0;
            this.speed.dy = 0;
        }

        // ball movement
        this.position.x += this.speed.dx * (delta * 100);
        this.position.y += this.speed.dy * (delta * 100);
    }
    draw(delta: number, ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = "pink";
        ctx.fillStyle = "pink";
        ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
    keyboard_event(key: string) {
        if (key === Constants.KEYDOWN_SPACEBAR) {
            // ball movement
            this.speed.dx = 2;
            this.speed.dy = 4;
        }
    }
}