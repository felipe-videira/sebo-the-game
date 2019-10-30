class Paddle extends GameObject {

    _width;
    _height;

    constructor (name = "Paddle", { 
        color = "#0095DD", 
        speed = 7, 
        width = 10,
        height = 75,
        input = gameConfig.inputs.p1
    } = {}) {
        super(name); 

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

    start () {
        super.start();

        this.getComponent('Rigidbody')
            .setPosition(
                (Canvas.dimensions.width - this._width) / 2,  
                Canvas.dimensions.height - this._height
            );
    }
}

