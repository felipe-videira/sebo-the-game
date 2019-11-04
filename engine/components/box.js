class Box extends Component {

    _userRef;
    _color;
    _width;
    _height;

    constructor (userRef, { color = "#0095DD", width = 10, height = 10 } = {}) {
        super(); 

        this._color = color;
        this._width = width;
        this._height = height;
        this._userRef = userRef;
    }

    get name () {
        return "Box";
    }

    start () {
        super.start();
        
        if (!this._userRef.transform) {
            throw Error('To use a Box you must have a transform!')
        }
    }

    update () {
        super.update(); 
        
        Canvas.createBox({
            x: this._userRef.transform.x,
            y: this._userRef.transform.y,
            rotation: this._userRef.transform.rotation,
            color: this._color,
            width: this._width,
            height: this._height
        })
    }

}