class BoxCollider extends Collider {
    
    _width;
    _height;
    _collide;
    _previousX;
    _previousY;
    _previousRotation;

    constructor (userRef, { width = 10, height = 10, collide = true  } = {}) {
        super(userRef)

        this._width = width;
        this._height = height;
        this._collide = collide;
    }

    get xMeasureUnit () {
        return this._width;
    }
    
    get yMeasureUnit () {
        return this._height;
    }

    start () {
        super.start();
        
        if (!this._userRef.transform) {
            throw Error('You must have a transform in order to use BoxCollider')
        }
    }

    update () {
        super.update();
        
        this._previousX = this._userRef.transform.x;
        this._previousY = this._userRef.transform.y;
        this._previousRotation = this._userRef.transform.rotation;
    }

    detectCollision () {
        let collided = false;

        Collision.checkCollisions(this, other => {
            if (Collision.SATCollision({
                    aX: this.x, 
                    aY: this.y, 
                    aRotation: this.rotation,
                    aWidth: this._width,
                    aHeight: this._height,
                    aIsRect: true,
                    bX: other.x, 
                    bY: other.y, 
                    bWidth: other.xMeasureUnit,
                    bHeight: other.yMeasureUnit,
                    bRotation: other.rotation,
                    bIsRect: true,
                })
            ) {
                collided = true;

                if (!this._collide) return;

                this._userRef.transform.x = this._previousX;
                this._userRef.transform.y = this._previousY;
                this._userRef.transform.rotation = this._previousRotation;
            }
        })

        if (this.x + this._width > Canvas.dimensions.width) {
            if (this._collide) {
                this._userRef.transform.x = Canvas.dimensions.width - this._width;
            }
            
            collided = true;
        }

        if (this.x < 0) {
            if (this._collide) {
                this._userRef.transform.x = 0;
            }

            collided = true;
        }

        if (this.y + this._height > Canvas.dimensions.height) {
            if (this._collide) {
                this._userRef.transform.y = Canvas.dimensions.height - this._height;
            }

            collided = true;
        }

        if (this.y < 0) {
            if (this._collide) {
                this._userRef.transform.y = 0;
            }

            collided = true;
        }

        if (collided) this.onCollision()

        return collided;
    }
}