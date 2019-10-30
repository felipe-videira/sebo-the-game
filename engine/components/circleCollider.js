class CircleCollider extends Collider {
    
    _radius;
    _collide;

    constructor (userRef, { radius = 10, collide = true } = {}) {
        super(userRef)

        this._radius = radius;
        this._collide = collide;
    }

    start () {
        super.start();
        
        if (!this._userRef.transform) {
            throw Error('You must have a transform in order to use CircleCollider')
        }
    }

    detectCollision (xAxis = [], yAxis = []) {
        let collided = false;
        let onX = false;
        let onY = false;

        for (const x of xAxis) {
            if (this._userRef.transform.x > x - this._radius || this._userRef.transform.x < this._radius) {
                if (this._collide) this._userRef.transform.x = x - this._radius;
    
                collided = true;
                onX = true;
            }
        }

        for (const y of yAxis) {
            if (this._userRef.transform.y > y - this._radius || this._userRef.transform.y < this._radius) {
                if (this._collide) this._userRef.transform.y = y - this._radius;
    
                collided = true;
                onY = true;
            }
        }
        
        if (collided) this.onCollision({ onX, onY })
    }
}