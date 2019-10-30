class Collider extends Component {
    
    _userRef;
    _onCollision = [];

    constructor (userRef) {
        super();
        
        this._userRef = userRef;
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

    start () {
        Collision.subscribeCollider(this);
    }

    detectCollision (xAxis = [], yAxis = []) {
        throw Error("The method detectCollision must be implemented!");
    }
    
    subscribeOnCollision (callback) {
        if (typeof callback !== 'function') {
            throw Error("'onCollision' must be a function!");
        }

        this._onCollision.push(callback);
    }

    onCollision ({ onX = false, onY = false } = {}) {
        for (const callback of this._onCollision) {
            callback({ onX, onY });
        }
    }

}