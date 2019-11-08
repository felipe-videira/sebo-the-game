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
        let collision = null;
        let collidedObj = null

        Collision.checkCollisions(this, other => {
            const abCollision = Collision.abSatCollision({
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
            
            if (abCollision) {
                collision = abCollision;

                this._abCollision && Collision.abPushAway(this, other);

                collidedObj = other;
            }
        })
        
        const canvasColl = Collision.canvasSatCollision(this);

        if (canvasColl) {
            collision = canvasColl;

            this._borderCollision && Collision.pushAway(canvasColl.axis, canvasColl.pos, this);
        }
        
        collision && this._collide([collision, this, collidedObj]);

        return collision;
    }
}