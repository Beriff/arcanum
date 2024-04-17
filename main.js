const page_width = document.documentElement.clientWidth;
const page_height = document.documentElement.clientHeight;
const origin = {x: page_width / 2, y: page_height / 2};

const center_point = document.getElementById("center");
let center_point_x = origin.x;
let center_point_y = origin.y;
const cpoff = 5;

const x_axis = document.getElementById("x-axis");
let x_axis_x = origin.x;
let x_axis_y = origin.y;

const y_axis = document.getElementById("y-axis");
let y_axis_x = origin.x;
let y_axis_y = origin.y;

const coordinates = document.getElementById("coordinates");
const dx = 100;
const dy = 100;
let adx = 20;
let ady = 20;
const adxc = 20;
const adyc = 20;
const coff = 2;
const cc = 8;

function changePosition(e, x, y) {
    e.style.top = y + "px";
    e.style.left = x + "px";
}

setInterval(tick, 500);

document.addEventListener("keydown", (e) => {
    const key = e.key;

    shift(key);
    zoom(key);
});

function createCoordinates() {
    coordinates.innerHTML = "";

    for(let i = 0; i < cc; i++) {
        const cooru = document.createElement("div");
        const coorr = document.createElement("div");
        const coorl = document.createElement("div");
        const coord = document.createElement("div");

        const coorud = document.createElement("p");
        const coorrd = document.createElement("p");
        const coorld = document.createElement("p");
        const coordd = document.createElement("p");

        const axisu = document.createElement("div");
        const axisd = document.createElement("div");
        const axisr = document.createElement("div");
        const axisl = document.createElement("div");

        cooru.className = "coordinate";
        coorr.className = "coordinate";
        coorl.className = "coordinate";
        coord.className = "coordinate";

        coorud.className = "coordinate-id";
        coorrd.className = "coordinate-id";
        coorld.className = "coordinate-id";
        coordd.className = "coordinate-id";

        axisu.className = "axis-horizontal";
        axisd.className = "axis-horizontal";
        axisr.className = "axis-vertical";
        axisl.className = "axis-vertical";

        coorud.innerText = Math.round((dy * i / ady) * 100) / 100;
        coorrd.innerText = Math.round((dx * i / adx) * 100) / 100;
        coorld.innerText = Math.round((dx * i / adx) * 100) / 100;
        coordd.innerText = Math.round((dy * i / ady) * 100) / 100;

        changePosition(cooru, y_axis_x - coff, x_axis_y - i * dy);
        changePosition(coorr, y_axis_x + i * dx, x_axis_y - coff);
        changePosition(coorl, y_axis_x - i * dx, x_axis_y - coff);
        changePosition(coord, y_axis_x - coff, x_axis_y + i * dy);

        changePosition(coorud, y_axis_x - coff * 2, x_axis_y - i * dy - coff * 5);
        changePosition(coorrd, y_axis_x + i * dx, x_axis_y - coff * 5);
        changePosition(coorld, y_axis_x - i * dx, x_axis_y - coff * 5);
        changePosition(coordd, y_axis_x - coff * 2, x_axis_y + i * dy - coff * 5);

        changePosition(axisu, 0, x_axis_y - i * dy + coff);
        changePosition(axisd, 0, x_axis_y + i * dy + coff);
        changePosition(axisr, y_axis_x + i * dx + coff, 0);
        changePosition(axisl, y_axis_x - i * dx + coff, 0);

        if(i !== 0) {
            //coordinates.appendChild(cooru);
            //coordinates.appendChild(coorr);
            //coordinates.appendChild(coorl);
            //coordinates.appendChild(coord);

            coordinates.appendChild(coorud);
            coordinates.appendChild(coorrd);
            coordinates.appendChild(coorld);
            coordinates.appendChild(coordd);

            coordinates.appendChild(axisu);
            coordinates.appendChild(axisd);
            coordinates.appendChild(axisr);
            coordinates.appendChild(axisl);

            for(let j = 0; j < cc; j++) {
                const dur = document.createElement("div");
                const ddr = document.createElement("div");
                const dul = document.createElement("div");
                const ddl = document.createElement("div");

                dur.className = "coordinate";
                ddr.className = "coordinate";
                dul.className = "coordinate";
                ddl.className = "coordinate";

                changePosition(dur, y_axis_x + i * dx, x_axis_y - j * dy);
                changePosition(ddr, y_axis_x + i * dx, x_axis_y + j * dy);
                changePosition(dul, y_axis_x - i * dx, x_axis_y - j * dy);
                changePosition(ddl, y_axis_x - i * dx, x_axis_y + j * dy);

                if(j !== 0) {
                    //coordinates.appendChild(dur);
                    //coordinates.appendChild(ddr);
                    //coordinates.appendChild(dul);
                    //coordinates.appendChild(ddl);
                }
            }
        }
    }
}

function tick() {
    //changePosition(center_point, center_point_x - cpoff, center_point_y - cpoff);
    changePosition(x_axis, 0, x_axis_y);
    changePosition(y_axis, y_axis_x, 0);
    createCoordinates();
}

function shift(key) {
    if(key === "ArrowRight") {
        center_point_x-=15;
        x_axis_x-=15;
        y_axis_x-=15;
    }
    if(key === "ArrowLeft") {
        center_point_x+=15;
        x_axis_x+=15;
        y_axis_x+=15;
    }
    if(key === "ArrowUp") {
        center_point_y+=15;
        x_axis_y+=15;
        y_axis_y+=15;
    }
    if(key === "ArrowDown") {
        center_point_y-=15;
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

    console.log(adx, ady);
}