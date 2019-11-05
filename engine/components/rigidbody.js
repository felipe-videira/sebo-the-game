class Rigidbody extends Component {
    
    _userRef;
    _collision;
    _accelerationX = 0;
    _accelerationY = 0;
    _velocityX = 0;
    _velocityY = 0;
    _friction = 0.97;

    constructor(userRef) {
        super();
        
        this._userRef = userRef;
    }

    get name () {
        return "Rigidbody";
    }

    start () {
        super.start();
        
        if (!this._userRef.transform) {
            throw Error('To use a Rigidbody you must have a transform!')
        }

        if (!this._userRef.getComponent("Collider")) {
            throw Error('To use a Rigidbody you must have a Collider attached!');
        }
    }

    move (force = 0, rotation = 0) {
        this._userRef.transform.rotation += rotation;
        
        this.addForce(force);
    }

    addForce(force, rotation = this._userRef.transform.rotation) {
        this._accelerationX = Math.cos(rotation) * force;
        this._accelerationY = Math.sin(rotation) * force;
        
        this._velocityX += this._accelerationX;
        this._velocityY += this._accelerationY;

        this._velocityX *= this._friction;
        this._velocityY *= this._friction;

        this._userRef.transform.x += this._velocityX;
        this._userRef.transform.y += this._velocityY;
        
        this._userRef.getComponent("Collider").detectCollision();
    }
    
    setPosition (x, y, rotation) {
        this._userRef.transform.x = x;
        this._userRef.transform.y = y;
        this._userRef.transform.rotation = rotation;

        this._userRef.getComponent("Collider").detectCollision();
    }
}