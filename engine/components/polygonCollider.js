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

    start () {
        super.start();
        
        if (!this._userRef.transform) {
            throw Error('You must have a transform in order to use PolygonCollider')
        }
    }

    detectCollision (xAxis = [], yAxis = []) {
        let collided = false;
        let onX = false;
        let onY = false;

        for (const x of xAxis) {
            if (this._userRef.transform.x + this._width > x) {
                if (this._collide) this._userRef.transform.x = x - this._width;
                
                collided = true;
                onX = true;
            }
        }

        if (this._userRef.transform.x < 0) {
            if (this._collide) this._userRef.transform.x = 0;

            collided = true;
            onX = true;
        }

        for (const y of yAxis) {
            if (this._userRef.transform.y + this._height > y) {
                if (this._collide) this._userRef.transform.y = y - this._height;
    
                collided = true;
                onY = true;
            }
        }

        if (this._userRef.transform.y < 0) {
            if (this._collide) this._userRef.transform.y = 0;

            collided = true;
            onY = true;
        }

        if (collided) this.onCollision({ onX, onY })
    }
}