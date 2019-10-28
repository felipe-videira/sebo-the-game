class UserInput {
    _x = 0;
    _y = 0;

    constructor() {
        document.addEventListener("keydown", this._keyDownHandler, false);
        document.addEventListener("keyup", this._keyUpHandler, false);
    }

    _keyDownHandler (e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this._x = 1;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this._x = -1;
        }
    }

    _keyUpHandler (e) {
        if ((e.key == "Right" || e.key == "ArrowRight") || (e.key == "Left" || e.key == "ArrowLeft")) {
            this._x = 0;
        }
    }

    get values () {
        return {
            x: this._x,
            y: this._y,
        }
    }
}
