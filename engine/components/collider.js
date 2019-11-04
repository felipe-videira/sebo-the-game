class Collider extends Component {
    
    _uuid;
    _userRef;
    _onCollision = [];

    constructor (userRef) {
        super();
        
        this._uuid = uuid4();
        this._userRef = userRef;
    }

    get uuid () {
        return this._uuid;
    }

    get isCollider () {
        return true;
    }

    get name () {
        return "Collider";
    }

    get x () {
        return this._userRef.transform.x;
    }

    get y () {
        return this._userRef.transform.y;
    }

    get rotation () {
        return this._userRef.transform.rotation;
    }

    get xMeasureUnit () {
        throw Error("The getter xMeasureUnit must be implemented!");
    }

    get yMeasureUnit () {
        throw Error("The getter yMeasureUnit must be implemented!");
    }

    start () {
        super.start();
        
        Collision.subscribeCollider(this);
    }

    update () {
        super.update();

        Collision.subscribeCollider(this);
    }

    detectCollision (other) {
        throw Error("The method detectCollision must be implemented!");
    }
    
    subscribeOnCollision (callback) {
        if (typeof callback !== 'function') {
            throw Error("'onCollision' must be a function!");
        }

        this._onCollision.push(callback);
    }

    onCollision () {
        for (const callback of this._onCollision) {
            callback();
        }
    }

}