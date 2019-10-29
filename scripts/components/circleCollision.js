class CircleCollision extends Collision {
    
    _userRef;
    _radius;

    constructor (userRef, { radius = 10 } = {}) {
        super()

        this._userRef = userRef
        this._radius = radius;

        if (!this._userRef.transform) {
            throw Error('You must have a transform in order to use CircleCollision')
        }
    }

    detectCollision () {
        let collided = false;
        let onX = false;
        let onY = false;

        if (
            this._userRef.transform.x > Canvas.dimensions.width - this._radius || 
            this._userRef.transform.x < this._radius
        ) {
            this._userRef.transform.x = Canvas.dimensions.width - this._radius;
            collided = true;
            onX = true;
        }
        
        if (
            this._userRef.transform.y > Canvas.dimensions.height - this._radius || 
            this._userRef.transform.y < this._radius
        ) {
            this._userRef.transform.y = Canvas.dimensions.height - this._radius;
            collided = true;
            onY = true;
        }

        if (collided) this.onCollision({ onX, onY })
    }
}