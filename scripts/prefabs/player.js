class Player extends GameObject {

    _width;
    _height;
    _colors;
    _life;
    _damageAmount = 25;
    _minLife = 0.01;
    _maxLife = 0.99;
    _minDamage = 1;
    _maxDamage = 100;

    constructor (name = "Player", { 
        x = 0,
        y = 0,
        rotation = 0,
        color = "#000", 
        speed = 7, 
        rotationSpeed = 2,
        width = 75,
        height = 10,
        input = gameConfig.inputs.p1,
        startLife = 1
    } = {}) {
        super(name, { x, y, rotation }); 

        this._width = width;
        this._height = height;
        
        this.life = startLife;

        this._colors = [
            { value: shadeColor(color, -50), stop: 0 },
            { value: color, stop: 1 }, 
        ];

        this.addComponents([
            new Box(this, { 
                width, 
                height,
                gradient: this.lifeBarGradient,
                color: this._colors, 
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

        this.getComponent('Collider').onCollision(coll => this._onCollision(coll));
    }

    get lifeBarGradient () {
        const gradient = this.transform.x - (this._width * this.life);
        return [
            gradient - 1, 
            0, 
            gradient, 
            0
        ];
    }

    get life () {
        return this._life;
    }

    set life (v) {
        this._life = this._validateLife(v);

        if (this._life === this._minLife) this._die(); 
        
        this._updateLifeBar();
    }

    damage (amount) {
        this.life -= clamp(amount, this._minDamage, this._maxDamage) * 0.01
    }

    onDeath (callback) {
        if (typeof callback !== 'function') 
            throw Error("this is not a function");

        this._onDeath = callback;
    }

    _die () {
        this._onDeath && this._onDeath();
    }

    _updateLifeBar () {
        if (!this.getComponent("Box")) return;

        this.getComponent("Box").gradient = this.lifeBarGradient;
    }

    _validateLife (v) {
        return clamp(v, this._minLife, this._maxLife);
    }

    _onCollision ({ a, b } = collision = {}, colliderA, colliderB) {
        if (!a || !b || !colliderA || !colliderB) return;

        if (distance(b.axisA.x, b.axisA.y, b.axisB.x, b.axisB.y) === colliderB.xunit) {
            console.log("aqui")
            colliderB.user.damage(this._damageAmount);
        }
    }
}

