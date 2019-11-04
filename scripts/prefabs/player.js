class Player extends GameObject {

    _width;
    _height;

    constructor (name = "Paddle", { 
        x = 0,
        y = 0,
        rotation = 0,
        color = "#000", 
        speed = 7, 
        rotationSpeed = 2,
        width = 10,
        height = 75,
        input = gameConfig.inputs.p1
    } = {}) {
        super(name, { x, y, rotation }); 

        this._width = width;
        this._height = height;

        this.addComponents([
            new Box(this, { 
                width, 
                height, 
                color 
            }),
            new BoxCollider(this, { 
                width, 
                height 
            }),
            new Rigidbody(this),
            new CharacterController(this, { 
                speed, 
                rotationSpeed,
                input 
            })
        ])
    }
}

