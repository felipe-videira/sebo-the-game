class Paddle extends MonoBehaviour {

    _color = "#0095DD";
    _height = 75;
    _width = 10;
    _speed = 7;
    _x;
    _y;

    constructor ({ 
        color = null, 
        width = null, 
        height = null,
        speed = null, 
    } = {}) {
        super(); 

        if (color) this._color = color;
        if (width) this._width = width;
        if (height) this._height = height;
        if (speed) this._speed = speed;
    }

    
    start () {
        this._x = (Canvas.dimensions.width - this._width) / 2;
        this._y = Canvas.dimensions.height - this._height;
    }

    update () {
        Canvas.createPolygon({
            x: this._x,
            y: this._y,
            color: this._color,
            width: this._width,
            height: this._height
        })

        this.move()
    }

    move () {
        this._x += this._speed * Input.values.x;

        if (this._x + this._width > Canvas.dimensions.width) {
            this._x = Canvas.dimensions.width - this._width;
        }

        if (this._x < 0) this._x = 0;
    }
}

