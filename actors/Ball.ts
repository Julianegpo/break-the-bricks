import { Constants } from "../assets/utils/Constants";
import { Actor } from "./actor";
import { Bar } from "./bar";

export class Ball implements Actor {
    position: { x: number; y: number; };
    ctx: CanvasRenderingContext2D;
    speed: { dx: number, dy: number }

    constructor(playerBarPosition, ctx: CanvasRenderingContext2D) {
        this.position = { x: playerBarPosition.x, y: playerBarPosition.y };
        this.ctx = ctx;
        this.speed = { dx: 2, dy: 4 }
    }
    update(delta: number, canvasWidth, canvasHeight) {
        if (this.position.x + this.speed.dx > canvasWidth
            || this.position.x + this.speed.dx < 0)
            this.speed.dx = -this.speed.dx;
        if (this.position.y + this.speed.dy > canvasHeight
            || this.position.y + this.speed.dy < 0)
            this.speed.dy = -this.speed.dy;

        this.position.x += this.speed.dx*(delta*200);
        this.position.y += this.speed.dy*(delta*200);
    }
    draw(delta: number, ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "pink";
        ctx.fillStyle = "pink";
        ctx.beginPath();
        ctx.arc(this.position.x + 25, this.position.y - 20, 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
    keyboard_event(key: string) {
    }

}