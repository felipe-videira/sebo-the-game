class Ball extends GameObject {

    _targetX = 1;
    _targetY = -1;
    _color;
    _speed;
    _radius;

    constructor ({ 
        color =  "#0095DD", 
        radius = 10, 
        speed = 2 
    } = {}) {
        super(); 

        this._color = color;
        this._radius = radius;
        this._speed = speed;

        this.addComponent(new CircleCollision(this, { radius }))
        this.addComponent(new RigidBody(this))
    }

    start () {
        this.getComponent('Rigidbody')
            .setPosition(Canvas.dimensions.width / 2, Canvas.dimensions.height - 30)

        this.getComponent("Collision").onCollision = this._handleCollision
    }

    update () {
        Canvas.createCircle({
            x: this.transform.x, 
            y: this.transform.y,  
            radius: this._radius, 
            color: this._color,
        });
        
        this.getComponent("Rigidbody").move(this._targetX, this._targetY, this._speed)
    }

    _handleCollision (collision) {
        if (collision.onX) this._targetX = -this._speed;
        if (collision.onY) this._targetY = -this._speed;
    }
}
 