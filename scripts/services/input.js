

const validRightKeys = ["Right", "ArrowRight", "d", "KeyD"]
const validLeftKeys = ["Left", "ArrowLeft", "a", "KeyA"]
const validUpKeys = ["Up", "ArrowUp", "w", "KeyW"]
const validDownKeys = ["Down", "ArrowDown", "s", "KeyS"]

class Input extends MonoBehaviour {
    _x = 0;
    _y = 0;

    constructor() {
        super();

        if (!!Input.instance) {
            return Input.instance;
        }

        Input.instance = this;

        document.addEventListener("keydown", e => this._keyDownHandler(e), false);
        document.addEventListener("keyup", e => this._keyUpHandler(e), false);
        
        return this;
    }

    static get x () {
        return this.instance._x;
    }

    static get y () {
        return this.instance._y;
    }

    _keyDownHandler (e) {
        if (validRightKeys.includes(e.key)) this._x = 1;
        
        if (validLeftKeys.includes(e.key)) this._x = -1;

        if (validUpKeys.includes(e.key)) this._y = 1;

        if (validDownKeys.includes(e.key)) this._y = -1;
    }
    
    _keyUpHandler (e) {
        if ([...validRightKeys, ...validLeftKeys].includes(e.key)) {
            this._x = 0;
        }

        if ([...validUpKeys, ...validDownKeys].includes(e.key)) {
            this._y = 0;
        }
    }
}
