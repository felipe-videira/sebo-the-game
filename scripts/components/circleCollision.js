class CircleCollision extends Collision {
    
    _userRef;
    _radius;
    _collide;

    constructor (userRef, { radius = 10, collide = true } = {}) {
        super(userRef)

        this._userRef = userRef
        this._radius = radius;
        this._collide = collide;
    }

    start () {
        super.start();
        
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
            if (this._collide) this._userRef.transform.x = Canvas.dimensions.width - this._radius;

            collided = true;
            onX = true;
        }
        
        if (
            this._userRef.transform.y > Canvas.dimensions.height - this._radius || 
            this._userRef.transform.y < this._radius
        ) {
            if (this._collide) this._userRef.transform.y = Canvas.dimensions.height - this._radius;

            collided = true;
            onY = true;
        }
        
        if (collided) this.onCollision({ onX, onY })
    }
}