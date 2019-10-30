class Collider extends Component {
    
    _userRef;
    _onCollision = [];

    constructor (userRef) {
        super();
        
        this._userRef = userRef;
    }

    get name () {
        return "Collider";
    }

    update () {
        super.update();

        this.detectCollision();
    }

    detectCollision () {
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