class Ball extends MonoBehaviour {

    _color = "#0095DD";
    _radius = 10;
    _speed = 2;
    _targetX;
    _targetY;
    _x;
    _y;

    constructor ({ 
        color = null, 
        radius = null, 
        speed = null 
    } = {}) {
        super(); 

        if (color) this._color = color;
        if (radius) this._radius = radius;
        if (speed) this._speed = speed;

        this._targetX = this._speed;
        this._targetY = -this._speed;
    }

    start () {
        this._x = Canvas.dimensions.width / 2;
        this._y = Canvas.dimensions.height - 30;
    }

    update () {
        Canvas.createCircle({
            x: this._x, 
            y: this._y,  
            radius: this._radius, 
            color: this._color,
        });
        
        this.move()
    }

    move () {
        if (
            this._x + this._targetX > Canvas.dimensions.width - this._radius || 
            this._x + this._targetX < this._radius
        ) {
            this._targetX = -this._targetX;
        }
    
        if (
            this._y + this._targetY > Canvas.dimensions.height - this._radius || 
            this._y + this._targetY < this._radius
        ) {
            this._targetY = -this._targetY;
        }
    
        this._x += this._targetX;
        this._y += this._targetY; 
    }
}