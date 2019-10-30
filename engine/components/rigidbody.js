class Rigidbody extends Component {
    
    _collision;
    _userRef

    //TODO: put this guys to use
    _gravity = 9.8;
    _mass;
    _useGravity;

    constructor(userRef, { 
        mass = 10, 
        useGravity = false, 
    } = {}) {
        super();
        
        this._userRef = userRef;
        this._mass = mass;
        this._useGravity = useGravity;
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

    move (x, y, speed) {
        this._userRef.transform.x += speed * x;
        this._userRef.transform.y += speed * y;
    }

    setPosition (x, y) {
        this._userRef.transform.x = x;
        this._userRef.transform.y = y;
    }
}