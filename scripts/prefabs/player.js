class Player extends GameObject {

    _width;
    _height;

    constructor (name = "Paddle", { 
        x = 0,
        y = 0,
        color = "#0095DD", 
        speed = 7, 
        width = 10,
        height = 75,
        input = gameConfig.inputs.p1
    } = {}) {
        super(name, { x, y }); 

        this._width = width;
        this._height = height;

        this.addComponents([
            new Polygon(this, { 
                width, 
                height, 
                color 
            }),
            new PolygonCollider(this, { 
                width, 
                height 
            }),
            new Rigidbody(this),
            new CharacterController(this, { 
                speed, 
                input 
            })
        ])
    }
}

