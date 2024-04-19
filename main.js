const page_width = document.documentElement.clientWidth;
const page_height = document.documentElement.clientHeight;
const origin = {x: page_width / 2, y: page_height / 2};

let x_axis_x = origin.x;
let x_axis_y = origin.y;

let y_axis_x = origin.x;
let y_axis_y = origin.y;

const dx = 100;
const dy = 100;
let adx = 20;
let ady = 20;
const adxc = 20;
const adyc = 20;
const coff = 2.5;

const main_axis = document.getElementById("axis");
const ctxa = main_axis.getContext("2d");

const coor = document.getElementById("coordinates");
const ctxc = coor.getContext("2d");

const scale = window.devicePixelRatio;

main_axis.width = main_axis.offsetWidth * scale;
main_axis.height = main_axis.offsetHeight * scale;

coor.width = coor.offsetWidth * scale;
coor.height = coor.offsetHeight * scale;

ctxa.scale(scale, scale);
ctxc.scale(scale, scale);

lineWidth(ctxa, 1);
lineWidth(ctxc, 0.5);

setInterval(tick, 100);

document.addEventListener("keydown", (e) => {
    const key = e.key;

    shift(key);
    zoom(key);
});

function createCoordinates() {
    for(let i = 1; i < 10; i++) {
        strokeColor(ctxc, "black");
        line(ctxc, 0, x_axis_y - i * dy, page_width, x_axis_y - i * dy);
        line(ctxc, 0, x_axis_y + i * dy, page_width, x_axis_y + i * dy);
        line(ctxc, y_axis_x + i * dx, 0, y_axis_x + i * dx, page_height);
        line(ctxc, y_axis_x - i * dx, 0, y_axis_x - i * dx, page_height);

        let ver = Math.round((dy * i / ady) * 100) / 100; if(ver < 10) ver = ` ${ver}`;
        let hor = Math.round((dx * i / adx) * 100) / 100; if(hor < 10) hor = ` ${hor}`;
        const top = coff * 5;
        const left = coff * 8;

        text(ctxc, y_axis_x - left, x_axis_y - i * dy - top + left * 1.3, ver, 15, "OCR A");
        text(ctxc, y_axis_x + i * dx - left, x_axis_y + top, hor, 15, "OCR A");
        text(ctxc, y_axis_x - i * dx - left, x_axis_y + top, hor, 15, "OCR A");
        text(ctxc, y_axis_x - left, x_axis_y + i * dy - top + left * 1.3, ver, 15, "OCR A");
    }
}

function tick() {
    ctxa.clearRect(0, 0, main_axis.width, main_axis.height);
    ctxc.clearRect(0, 0, coor.width, coor.height);

    createCoordinates();
    
    strokeColor(ctxa, "black");
    line(ctxa, 0, x_axis_y, page_width, x_axis_y);
    line(ctxa, y_axis_x, 0, y_axis_x, page_height);
}

function shift(key) {
    if(key === "ArrowRight") {
        x_axis_x-=15;
        y_axis_x-=15;
    }
    if(key === "ArrowLeft") {
        x_axis_x+=15;
        y_axis_x+=15;
    }
    if(key === "ArrowUp") {
        x_axis_y+=15;
        y_axis_y+=15;
    }
    if(key === "ArrowDown") {
        x_axis_y-=15;
        y_axis_y-=15;
    }
}

function zoom(key) {
    if(key === "1") {
        adx += adxc;
        ady += adyc;
    }
    if(key === "2") {
        adx -= adxc;
        ady -= adyc;
    }
}
