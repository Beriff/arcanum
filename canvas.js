class CanvasProxy {
    Line(start, end, width = 0.5) {
        this.context.strokeStyle = "gray"
        this.context.lineWidth = width
        
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke()
    }

    Text(text, position, size) {
        this.context.font = `${size}px OCR A`
        this.context.fillText(text, position.x, position.y)
    }

    constructor(context) {
        this.context = context;
    }
}

function fillColor(ctx, c) {
    ctx.fillStyle = c;
}

function strokeColor(ctx, c) {
    ctx.strokeStyle = c;
}

function line(ctx, sx, sy, ex, ey) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
}


function lineWidth(ctx, n) {
    ctx.lineWidth = n;
}

function text(ctx, x, y, t, s, f) {
    ctx.font = `${s}px ${f}`;
    ctx.fillText(t, x, y);
}
