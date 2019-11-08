class Input extends MonoBehaviour {
    
    _input = {}

    constructor() {
        super();

        if (!!Input.instance) {
            return Input.instance;
        }

        Input.instance = this;

        document.addEventListener("keydown", e => this._keyDownHandler(e), false);
        document.addEventListener("keyup", e => this._keyUpHandler(e), false);

        for (const key in gameConfig.inputs) {
            this._input[gameConfig.inputs[key]] = { x: 0, y: 0 }
        }
        
        return this;
    }

    get name () {
        return "Input";
    }

    static get values () {
        return this.instance._input;
    }

    _keyDownHandler (e) {
        for (const key in gameConfig.inputs) {
            this._checkKey(e.key, gameConfig.inputs[key]);
        }
    }

    _keyUpHandler (e) {
        for (const key in gameConfig.inputs) {
            this._checkKey(e.key, gameConfig.inputs[key], 0);
        }
    }

    _checkKey (key, input, valueToSet = null) {
        if (gameConfig.inputKeys[input].right.includes(key)) 
            this._input[input].x = !isNullOrEmpty(valueToSet) ? valueToSet : 1;

        if (gameConfig.inputKeys[input].left.includes(key)) 
            this._input[input].x = !isNullOrEmpty(valueToSet) ? valueToSet : -1;

        if (gameConfig.inputKeys[input].up.includes(key)) 
            this._input[input].y = !isNullOrEmpty(valueToSet) ? valueToSet : 1;
            
        if (gameConfig.inputKeys[input].down.includes(key)) 
            this._input[input].y = !isNullOrEmpty(valueToSet) ? valueToSet : -1;
    }
}
