/**
 * Optimized renderer for large arrays (n > 150).
 * Uses simple fillRect for smooth 60fps during O(n log n) sorts.
 */
class BarRenderer {
    constructor(canvasWidth, canvasHeight, n, values, margin = 20) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.n = n;
        this.margin = margin;
        this.maxHeight = canvasHeight - margin * 2;
        this.spacing = (canvasWidth - margin * 2) / n;
        this.barWidth = Math.max(1, this.spacing - 1);
        this.bars = values.map((v, i) => ({
            value: v,
            x: margin + i * this.spacing + this.spacing / 2 - this.barWidth / 2,
            targetX: margin + i * this.spacing + this.spacing / 2 - this.barWidth / 2,
            height: v * this.maxHeight
        }));
    }

    swap(i, j) {
        [this.bars[i], this.bars[j]] = [this.bars[j], this.bars[i]];
        this.bars[i].targetX = this.margin + i * this.spacing + this.spacing / 2 - this.barWidth / 2;
        this.bars[j].targetX = this.margin + j * this.spacing + this.spacing / 2 - this.barWidth / 2;
    }

    lerpPositions(speed = 0.15) {
        let changed = false;
        for (const bar of this.bars) {
            const dx = bar.targetX - bar.x;
            if (Math.abs(dx) > 0.5) {
                bar.x += dx * speed;
                changed = true;
            } else {
                bar.x = bar.targetX;
            }
        }
        return changed;
    }

    draw(ctx, highlightIndices = []) {
        const set = new Set(highlightIndices);
        for (let i = 0; i < this.bars.length; i++) {
            const bar = this.bars[i];
            const left = bar.x;
            const top = this.canvasHeight - this.margin - bar.height;
            ctx.fillStyle = set.has(i) ? "rgb(100, 200, 100)" : "rgb(150, 150, 150)";
            ctx.fillRect(left, top, this.barWidth, bar.height);
        }
    }

    update(values) {
        this.bars = values.map((v, i) => ({
            value: v,
            x: this.margin + i * this.spacing + this.spacing / 2 - this.barWidth / 2,
            targetX: this.margin + i * this.spacing + this.spacing / 2 - this.barWidth / 2,
            height: v * this.maxHeight
        }));
    }
}
