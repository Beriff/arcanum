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

function arc(ctx, x, y, r, sa, ea, d, s) {
    ctx.beginPath();
    ctx.arc(x, y, r, sa, ea, d);
    if(s === "stroke") {
        ctx.stroke();
    } else if(s === "fill") {
        ctx.fill();
    }
}

function lineWidth(ctx, n) {
    ctx.lineWidth = n;
}
