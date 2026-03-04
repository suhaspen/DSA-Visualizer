class Column {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue = [];
    }

    moveTo(dest, y_offset, frameCount = 20) {
        for (let i = 1; i <= frameCount; i++) {
            const t = i / frameCount; 
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: lerp(this.x, dest.x, t),
                y: lerp(this.y, dest.y, t) + u * this.width / 2
            });
        }
    }

    jump(frameCount = 20) {
        for (let i = 1; i <= frameCount; i++) {
            const t = i / frameCount; 
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: this.x, 
                y: this.y - u * this.width,
            });
        }
    }

    draw(ctx) {
        let changed = false; 
        if (this.queue.length > 0) {
            const {x, y} = this.queue.shift();
            this.x = x; 
            this.y = y;
            changed = true; 
        }
        const left = this.x - this.width / 2;
        const right = this.x + this.width / 2;
        const top = this.y - this.height;

        ctx.beginPath();
        ctx.fillStyle = "rgb(150, 150, 150)";
        ctx.strokeStyle = "black"; 
        ctx.lineWidth = 2;

        // Bottom ellipse
        ctx.ellipse(this.x, this.y, this.width / 2, this.width / 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Side rectangle
        ctx.beginPath();
        ctx.moveTo(left, this.y);
        ctx.lineTo(left, top);
        ctx.lineTo(right, top);
        ctx.lineTo(right, this.y);
        ctx.fill();
        ctx.stroke();

        // Top ellipse
        ctx.beginPath();
        ctx.ellipse(this.x, top, this.width / 2, this.width / 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        return changed; 
    }
}

function setCanvasBackground(canvas, ctx) {
    ctx.fillStyle = "rgb(170, 170, 170)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
