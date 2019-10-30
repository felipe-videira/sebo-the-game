class Collision extends Component {
    
    _userRef;
    _onCollision;

    constructor (userRef) {
        super();
        
        this._userRef = userRef;
    }

    get name () {
        return "Collision";
    }

    update () {
        super.update();

        this.detectCollision();
    }

    detectCollision () {
        throw Error("The method detectCollision must be implemented!");
    }
    
    setOnCollision (callback) {
        if (typeof callback !== 'function') {
            throw Error("'onCollision' must be a function!");
        }

        this._onCollision = callback;
    }

    onCollision ({ onX = false, onY = false } = {}) {
        this._onCollision && this._onCollision({ onX, onY });
    }

}