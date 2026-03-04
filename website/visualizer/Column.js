class Column {
    constructor(x, y, width, height, frameCount = 20) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue = [];
        this._frameCount = frameCount;
    }

    moveTo(dest, frameCount) {
        const fc = frameCount ?? this._frameCount;
        for (let i = 1; i <= fc; i++) {
            const t = i / fc;
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: lerp(this.x, dest.x, t),
                y: lerp(this.y, dest.y, t) + u * this.width / 2
            });
        }
    }

    jump(frameCount) {
        const fc = frameCount ?? this._frameCount;
        for (let i = 1; i <= fc; i++) {
            const t = i / fc;
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: this.x,
                y: this.y - u * this.width
            });
        }
    }

    draw(ctx, highlight = false) {
        let changed = false;
        if (this.queue.length > 0) {
            const { x, y } = this.queue.shift();
            this.x = x;
            this.y = y;
            changed = true;
        }
        const left = this.x - this.width / 2;
        const right = this.x + this.width / 2;
        const top = this.y - this.height;

        ctx.fillStyle = highlight ? "rgb(100, 200, 100)" : "rgb(150, 150, 150)";
        ctx.strokeStyle = highlight ? "rgb(50, 150, 50)" : "black";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width / 2, this.width / 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(left, this.y);
        ctx.lineTo(left, top);
        ctx.lineTo(right, top);
        ctx.lineTo(right, this.y);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(this.x, top, this.width / 2, this.width / 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        return changed;
    }
}
