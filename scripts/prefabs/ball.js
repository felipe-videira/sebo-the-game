class Ball extends GameObject {

    _initialPosition;
    _radius;

    constructor (name = "Ball", { 
        color =  "#0095DD", 
        radius = 10, 
        speed = 2,
        initialPosition = {
            x: Canvas.dimensions.width / 2,
            y: Canvas.dimensions.height - 10
        }  
    } = {}) {
        super(name); 

        this._initialPosition = initialPosition;
        this._radius = radius;

        this.addComponents([
            new Circle(this, { 
                color, 
                radius 
            }),
            new CircleCollider(this, { 
                radius, 
                collide: false 
            }),
            new Rigidbody(this),
            new Bounce(this, { 
                speed 
            })
        ]);
    }

    start () {
        super.start();

        this.getComponent('Rigidbody')
            .setPosition(this._initialPosition.x, this._initialPosition.y);
    }

    update () {
        if (this.transform.y > Canvas.dimensions.height - this._radius) {
            // EventEmitter.emit(EVENT.BALL_BEYOND_LIMITS);
        }
    }
}
 