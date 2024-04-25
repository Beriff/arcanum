class Plot {

    static ShiftCamera(plot, key) {
        switch (key) {
            case "ArrowRight":
                plot.camera.x += 15; break;
            case "ArrowLeft":
                plot.camera.x -= 15; break;
            case "ArrowUp":
                plot.camera.y -= 15; break;
            case "ArrowDown":
                plot.camera.y += 15; break;
        }
    }

    static ZoomCamera(plot, key) {
        switch(key) {
            case "1":
                plot.coordinateSpacing.x += 5;
                plot.coordinateSpacing.y += 5;
            case "2":
                plot.coordinateSpacing.x -= 5;
                plot.coordinateSpacing.y -= 5;
        }
    }

    Draw() {
        // calculate how many coordinate lines would fit
        let fit = {
            x: 
                Math.ceil(this.viewport.w / this.coordinateSpacing.x),
            y:
                Math.ceil(this.viewport.h / this.coordinateSpacing.y)
        };

        let camera_center = {x: this.camera.x + this.viewport.w / 2, y: this.camera.y + this.viewport.h / 2}


        // Draw horizontal lines
        for(let x = 0; x < fit.x / 2; x++) {
            let pos_x_front = camera_center.x + x * this.coordinateSpacing.x;
            let pos_x_back = camera_center.x - x * this.coordinateSpacing.x;

            this.canvasDrawer.Line({x: pos_x_front, y: 0}, {x: pos_x_front, y: this.viewport.h});
            this.canvasDrawer.Line({x: pos_x_back, y: 0}, {x: pos_x_back, y: this.viewport.h});
        }

        // Draw vertical lines
        for(let y = 0; y < fit.y / 2; y++) {
            let pos_y_top = camera_center.y + y * this.coordinateSpacing.y;
            let pos_y_bottom = camera_center.y - y * this.coordinateSpacing.y;

            this.canvasDrawer.Line({x: 0, y: pos_y_top}, {x: this.viewport.w, y: pos_y_top});
            this.canvasDrawer.Line({x: 0, y: pos_y_bottom}, {x: this.viewport.w, y: pos_y_bottom});
        }
    }

    constructor() {
        // Canvas stuff
        this.canvas = document.getElementById("axis");
        this.canvasContext = this.canvas.getContext("2d");
        this.canvasDrawer = new CanvasProxy(this.canvasContext);

        //Viewport stuff
        this.coordinateSpacing = {x: 50, y: 50};
        this.viewport = {w: document.documentElement.clientWidth, h: document.documentElement.clientHeight};
        this.camera = {x: 0, y: 0};

        this.canvas.width = this.viewport.w;
        this.canvas.height = this.viewport.h;

        console.log(this.viewport)

        //Probably shouldn't be initialized here
        document.addEventListener("keydown", (e) => {
            const key = e.key;
        
            this.ShiftCamera(this, key);
            this.ZoomCamera(this, key);
        });

        setInterval(() => {
            this.viewport = {w: document.documentElement.clientWidth, h: document.documentElement.clientHeight};

            this.canvasContext.clearRect(0, 0, this.viewport.w, this.viewport.h);
            this.Draw();
        })
    }
}

let plot = new Plot();