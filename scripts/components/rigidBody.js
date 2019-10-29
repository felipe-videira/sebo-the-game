class RigidBody extends Component {
    
    _collision;
    _userRef

    //TODO: put this guys to use
    _gravity = 9.8;
    _mass;
    _useGravity;

    constructor(userRef, { mass = 10, useGravity = false } = {}) {
        super();
        
        this._userRef = userRef;
        
        if (!this._userRef.transform) {
            throw Error('You must have a transform in order to use RigidBody')
        }

        if (!this._userRef.getComponent("Collision")) {
            throw Error('To use a rigidbody you must have a Collision attached!');
        }

        this._mass = mass;
        this._useGravity = useGravity;
    }

    get name () {
        return "Rigidbody";
    }

    move (x, y, speed) {
        this._userRef.transform.x += speed * x;
        this._userRef.transform.y += speed * y;
    }

    setPosition (x, y) {
        this._userRef.transform.x = x;
        this._userRef.transform.y = y;
    }
}