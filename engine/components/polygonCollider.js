class PolygonCollider extends Collider {
    
    _width;
    _height;
    _collide;

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
            throw Error('You must have a transform in order to use PolygonCollider')
        }
    }

    detectCollision (other = null) {
        let collided = false;
        let onX = false;
        let onY = false;

        if (other) {
            if (
                this.x < other.x + other.xMeasureUnit &&
                this.x + this._width > other.x &&
                this.y < other.y + other.yMeasureUnit &&
                this.y + this._height > other.y
            ) {
                collided = true;
                onX = other.x + other.xMeasureUnit !== this.x + this._width;
                onY = other.y + other.yMeasureUnit !== this.y + this._height;
                
                if (this._collide) {
                    if (onX) this._userRef.transform.x = other.xMeasureUnit - this._width;
                    if (onY) this._userRef.transform.y = other.yMeasureUnit - this._height;
                }
            }
        }

        if (this.x + this._width > Canvas.dimensions.width) {
            if (this._collide) this._userRef.transform.x = x - this._width;
            
            collided = true;
            onX = true;
        }

        if (this.x < 0) {
            if (this._collide) this._userRef.transform.x = 0;

            collided = true;
            onX = true;
        }

        if (this.y + this._height > Canvas.dimensions.height) {
            if (this._collide) this._userRef.transform.y = y - this._height;

            collided = true;
            onY = true;
        }

        if (this.y < 0) {
            if (this._collide) this._userRef.transform.y = 0;

            collided = true;
            onY = true;
        }

        if (collided) this.onCollision({ onX, onY })
    }
}