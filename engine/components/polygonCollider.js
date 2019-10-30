class PolygonCollider extends Collider {
    
    _userRef;
    _width;
    _height;
    _collide;

    constructor (userRef, { width = 10, height = 10, collide = true  } = {}) {
        super(userRef)

        this._userRef = userRef
        this._width = width;
        this._height = height;
        this._collide = collide;
    }

    start () {
        super.start();
        
        if (!this._userRef.transform) {
            throw Error('You must have a transform in order to use PolygonCollider')
        }
    }

    detectCollision () {
        let collided = false;
        let onX = false;
        let onY = false;

        if (this._userRef.transform.x + this._width > Canvas.dimensions.width) {
            if (this._collide) this._userRef.transform.x = Canvas.dimensions.width - this._width;
            
            collided = true;
            onX = true;
        }

        if (this._userRef.transform.x < 0) {
            if (this._collide) this._userRef.transform.x = 0;

            collided = true;
            onX = true;
        }
        
        if (this._userRef.transform.y + this._height > Canvas.dimensions.height) {
            if (this._collide) this._userRef.transform.y = Canvas.dimensions.height - this._height;

            collided = true;
            onY = true;
        }

        if (this._userRef.transform.y < 0) {
            if (this._collide) this._userRef.transform.y = 0;

            collided = true;
            onY = true;
        }

        if (collided) this.onCollision({ onX, onY })
    }
}