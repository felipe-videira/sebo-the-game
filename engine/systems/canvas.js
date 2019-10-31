class Canvas extends MonoBehaviour {
    
    _mainCanvas;
    _ctx;
    
    constructor() {
        super();
        
        if (!!Canvas.instance) {
            return Canvas.instance;
        }

        Canvas.instance = this;
        
        this._mainCanvas = document.getElementById("mainCanvas");
        this._ctx = mainCanvas.getContext("2d");

        return this;
    }

    get name () {
        return "Canvas";
    }

    update () {
        super.update();

        this._ctx.clearRect(0, 0, this._mainCanvas.width, this._mainCanvas.height);
    }
    
    static get dimensions () {
        return { 
            width: this.instance._mainCanvas.width,
            height: this.instance._mainCanvas.height
        }
    }
    
    static get center () { 
        return {
            x: this.instance._mainCanvas.width / 2,
            y: this.instance._mainCanvas.height / 2,
        }
    }

    static calculateCenter (elWidth = null, elHeight = null) { 
        return {
            x: (this.instance._mainCanvas.width / 2) - (elWidth / 2),
            y: (this.instance._mainCanvas.height / 2) - (elHeight / 2),
        }
    }
    
    static createPolygon ({ 
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

        this.instance._ctx.beginPath();
        this.instance._ctx.rect(x, y, width, height);
        this.instance._ctx.fillStyle = color;
        this.instance._ctx.fill();

        if (borderColor) {
            this.instance._ctx.strokeStyle  = borderColor;
            this.instance._ctx.stroke();
        }

        this.instance._ctx.closePath();
    };
    
    static createCircle ({ 
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

        this.instance._ctx.beginPath();
        this.instance._ctx.arc(x, y, radius, startAngle, endAngle, antiClockwise);
        this.instance._ctx.fillStyle = color;
        this.instance._ctx.fill();

        if (borderColor) {
            this.instance._ctx.strokeStyle  = borderColor;
            this.instance._ctx.stroke();
        }

        this.instance._ctx.closePath();
    };
}