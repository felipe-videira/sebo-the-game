class CanvasHandler {
    _mainCanvas;
    _ctx;
    
    constructor() {
        if (!!CanvasHandler.instance) {
            return CanvasHandler.instance;
        }
        CanvasHandler.instance = this;
        
        this._mainCanvas = document.getElementById("mainCanvas");
        this._ctx = mainCanvas.getContext("2d");

        EvtEmitter.on('update', () => this._clear())

        return this;
    }

    _clear () {
        this._ctx.clearRect(0, 0, this._mainCanvas.width, this._mainCanvas.height);
    }
    
    get dimensions () {
        return { 
            width: this._mainCanvas.width,
            height: this._mainCanvas.height
        }
    }
    
    get center () { 
        return {
            x: this._mainCanvas.width / 2,
            y: this._mainCanvas.height / 2,
        }
    }

    calculateCenter (elWidth = null, elHeight = null) { 
        return {
            x: (this._mainCanvas.width / 2) - (elWidth / 2),
            y: (this._mainCanvas.height / 2) - (elHeight / 2),
        }
    }
    
    createPolygon ({ 
        x = null, 
        y = null, 
        width = 10, 
        height = 10,
        size = null,
        color = "#000",
        borderColor = null
    } = {}) {
        if (size) {
            width = size
            height = size
        }
        if (!x && !y) {
            const center = this.calculateCenter(width, height)
            x = center.x
            y = center.y
        }
        this._ctx.beginPath();
        this._ctx.rect(x, y, height, width);
        this._ctx.fillStyle = color;
        this._ctx.fill();
        if (borderColor) {
            this._ctx.strokeStyle  = borderColor;
            this._ctx.stroke();
        }
        this._ctx.closePath();
    };
    
    createCircle ({ 
        x = null, 
        y = null, 
        radius = 10, 
        startAngle = 0, 
        endAngle = Math.PI * 2, 
        color = "#000",
        antiClockwise = null,
        borderColor = null,
    } = {}) {
        if (!x && !y) {
            x = this.center.x
            y = this.center.y
        }
        this._ctx.beginPath();
        this._ctx.arc(x, y, radius, startAngle, endAngle, antiClockwise);
        this._ctx.fillStyle = color;
        this._ctx.fill();
        if (borderColor) {
            this._ctx.strokeStyle  = borderColor;
            this._ctx.stroke();
        }
        this._ctx.closePath();
    };
}