class UserInput extends MonoBehaviour {

    _validRightKeys = ["Right", "ArrowRight", "d", "KeyD"]
    _validLeftKeys = ["Left", "ArrowLeft", "a", "KeyA"]
    _validUpKeys = ["Up", "ArrowUp", "w", "KeyW"]
    _validDownKeys = ["Down", "ArrowDown", "s", "KeyS"]
    _x = 0;
    _y = 0;

    constructor() {
        super();

        if (!!UserInput.instance) {
            return UserInput.instance;
        }

        UserInput.instance = this;

        document.addEventListener("keydown", e => this._keyDownHandler(e), false);
        document.addEventListener("keyup", e => this._keyUpHandler(e), false);
        
        return this;
    }

    get x () {
        return this._x;
    }

    get y () {
        return this._y;
    }

    _keyDownHandler (e) {
        if (this._validRightKeys.includes(e.key)) this._x = 1;
        
        if (this._validLeftKeys.includes(e.key)) this._x = -1;

        if (this._validUpKeys.includes(e.key)) this._y = 1;

        if (this._validDownKeys.includes(e.key)) this._y = -1;
    }
    
    _keyUpHandler (e) {
        if ([...this._validRightKeys, ...this._validLeftKeys].includes(e.key)) {
            this._x = 0;
        }

        if ([...this._validUpKeys, ...this._validDownKeys].includes(e.key)) {
            this._y = 0;
        }
    }
}
