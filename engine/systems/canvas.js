class Canvas extends MonoBehaviour {
    
    _lightTheme = '#eee';
    _darkTheme = '#1d1c1c';
    _canvasBackground = this._lightTheme;
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

    get canvas () {
        return this._mainCanvas;
    }

    update () {
        super.update();

        this._ctx.fillStyle = this._canvasBackground;
        this._ctx.fillRect(0, 0, this._mainCanvas.width, this._mainCanvas.height);
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
    
    static flipTheme () {
        this.instance._canvasBackground = 
            this.instance._canvasBackground === this.instance._lightTheme 
                ? this.instance._darkTheme
                : this.instance._lightTheme; 
    }

    static displayText ({
        text = "",
        x = this.center.x,
        y = this.center.y,
        fontSize = 30,
        font = 'Arial',
        type = 'fill' || 'stroke',
        color = "#000",
        textAlign = "center"
    }) {
        this.instance._ctx.font = `${fontSize}px ${font}`;
        this.instance._ctx.fillStyle = color;
        this.instance._ctx.textAlign = textAlign;
        this.instance._ctx[`${type}Text`](text, x, y);
    }

    static createButton({
        x = this.center.x,
        y = this.center.y,
        text = "",
        fontSize = 30,
        font = 'Arial',
        type = 'fill' || 'stroke',
        color = "#000",
        textAlign = "center",
        rotation = 0,
        width = 10, 
        height = 10,
        background = "#000",
        gradient = null,
        opacity = 1,
        borderColor = null,
        borderWidth = 0, 
    }, onClick = null) {
        Canvas.createBox({ 
            x,  
            y, 
            rotation, 
            width, 
            height, 
            color: background, 
            gradient, 
            opacity, 
            borderColor, 
            borderWidth 
        });
        Canvas.displayText({ 
            x: x + width / 2, 
            y: y + height / 2 + fontSize / 4, 
            text, 
            fontSize, 
            font, 
            type, 
            color, textAlign 
        });
        onClick && this.instance._mainCanvas.addEventListener('click', e => {
            const mouse = this.instance._getMousePos(this.instance._mainCanvas, e);
            if (Collision.boxCollision({
                aX: mouse.x,
                aY: mouse.y,
                aHeight: 10,
                aWidth: 10,
                bX: x,
                bY: y,
                bHeight: height,
                bWidth: width
            })) {
                onClick();
            }
        }, false);
    }

    static createLine ({
        fromX,
        fromY,
        toX,
        toY,
        lineWidth = 1,
        color = '#000',
    }) {
        this.instance._ctx.beginPath();
        this.instance._ctx.moveTo(fromX, fromY);
        this.instance._ctx.lineTo(toX, toY);
        this.instance._ctx.strokeStyle = color;
        this.instance._ctx.lineWidth = lineWidth;
        this.instance._ctx.stroke();
        this.instance._ctx.closePath();
    }
    
    static createCircle ({ 
        x = this.center.x,
        y = this.center.y,
        radius = 10, 
        startAngle = 0, 
        endAngle = Math.PI * 2, 
        color = "#000",
        antiClockwise = null,
        borderColor = null,
        borderWidth = 0
    } = {}) {
        this.instance._ctx.beginPath();
        this.instance._ctx.arc(x, y, radius, startAngle, endAngle, antiClockwise);
        this.instance._ctx.fillStyle = color;
        this.instance._ctx.fill();
        if (borderColor) {
            this.instance._ctx.strokeStyle = borderColor;
            this.instance._ctx.lineWidth = borderWidth;
            this.instance._ctx.stroke();
        }
        this.instance._ctx.closePath();
    }

    static createBox ({
        x = this.center.x, 
        y = this.center.y, 
        rotation = 0,
        width = 10, 
        height = 10,
        size = null,
        color = "#000",
        gradient = null,
        opacity = 1,
        borderColor = null,
        borderWidth = 0, 
    } = {}) {
        if (size) {
            width = size
            height = size
        }
        this.instance._ctx.save();
        this.instance._ctx.beginPath();
        this.instance._ctx.translate(x + width / 2, y + height / 2);
        if (Array.isArray(color)) {
            if (!gradient) gradient = [0, 0, width / 2, 0];
            color = this.instance._createGradient(color, gradient);
        }
        this.instance._ctx.fillStyle = color;
        this.instance._ctx.globalAlpha = opacity; 
        this.instance._ctx.rotate(rotation);
        this.instance._ctx.fillRect(-width / 2, -height / 2, width, height);
        if (borderColor) {
            this.instance._ctx.strokeStyle = borderColor;
            this.instance._ctx.lineWidth = borderWidth;
            this.instance._ctx.stroke();
        }
        this.instance._ctx.restore();
    }

    static createPolygon ({
        x = this.center.x, 
        y = this.center.y, 
        rotation = 0,
        sides = 3, 
        width = 10,
        height = 10, 
        size = null, 
        color = "#000", 
        borderColor = null, 
        borderWidth = 0, 
    } = {}) {
        if (size) {
            width = size
            height = size
        }
        const radians = degToRad(rotation) 
        this.instance._ctx.save();
        this.instance._ctx.translate(x, y);
        this.instance._ctx.rotate(radians);
        this.instance._ctx.beginPath();
        this.instance._ctx.moveTo(width * Math.cos(0), height * Math.sin(0));   
        for (let i = 1; i <= sides; i++) {
            this.instance._ctx.lineTo(
                width * Math.cos(i * 2 * Math.PI / sides),
                height * Math.sin(i * 2 * Math.PI / sides)
            );
        }
        this.instance._ctx.closePath();
        this.instance._ctx.fillStyle = color;
        if (borderColor) {
            this.instance._ctx.strokeStyle = borderColor;
            this.instance._ctx.lineWidth = borderWidth;
            this.instance._ctx.stroke();
        }
        this.instance._ctx.fill();
        this.instance._ctx.rotate(-radians);
        this.instance._ctx.translate(-x, -y);    
        this.instance._ctx.restore();
    }

    _createGradient (colors, gradient) {
        const grd = this._ctx.createLinearGradient(...gradient);
        for (const { value, stop } of colors) {
            grd.addColorStop(stop, value)
        }
        return grd;
    }

    _getMousePos (canvas, { clientX, clientY }) {
        const { left, top } = canvas.getBoundingClientRect();
        
        return { x: clientX - left, y: clientY - top };
    }
}


