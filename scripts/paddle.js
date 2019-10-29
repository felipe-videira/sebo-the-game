class Paddle extends GameObject {

    _color;
    _speed;
    _width;
    _height;

    constructor ({ 
        color = "#0095DD", 
        speed = 7, 
        width = 10,
        height = 75
    } = {}) {
        super(); 

        this._color = color;
        this._speed = speed;
        this._width = width;
        this._height = height;

        this.addComponent(new PolygonCollision(this, { width, height }))
        this.addComponent(new RigidBody(this))
    }
    
    start () {
        this.getComponent('Rigidbody')
            .setPosition((Canvas.dimensions.width - this._width) / 2, Canvas.dimensions.height - this._height)
    }

    update () {
        Canvas.createPolygon({
            x: this.transform.x,
            y: this.transform.y,
            color: this._color,
            width: this._width,
            height: this._height
        })

        this.getComponent('Rigidbody').move(Input.x, Input.y * -1, this._speed);
    }
}

