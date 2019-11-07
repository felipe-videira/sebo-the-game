class BoxCollider extends Collider {
    
    _width;
    _height;
    _abCollision;
    _borderCollision;

    constructor (userRef, { width = 10, height = 10, abCollision = true, borderCollision = true } = {}) {
        super(userRef)

        this._width = width;
        this._height = height;
        this._abCollision = abCollision;
        this._borderCollision = borderCollision;
    }

    get xunit () {
        return this._width;
    }
    
    get yunit () {
        return this._height;
    }

    start () {
        super.start();
        
        if (!this._userRef.transform) {
            throw Error('You must have a transform in order to use BoxCollider')
        }
    }

    detectCollision () {
        let collided = false;

        Collision.checkCollisions(this, other => {
            if (Collision.abSatCollision({
                    aX: this.x, 
                    aY: this.y, 
                    aRotation: this.rotation,
                    aWidth: this._width,
                    aHeight: this._height,
                    aIsRect: true,
                    bX: other.x, 
                    bY: other.y, 
                    bWidth: other.xunit,
                    bHeight: other.yunit,
                    bRotation: other.rotation,
                    bIsRect: true,
                })
            ) {
                collided = true;

                if (!this._abCollision) return;
                
                Collision.abPushAway(this, other);
            }
        })
        
        const collision = Collision.canvasSatCollision(this);
        if (collision) {
            collided = true;

            if (!this._borderCollision) return;

            Collision.pushAway(collision.axis, collision.pos, this);
        }

        collided && this.onCollision();

        return collided;
    }
}