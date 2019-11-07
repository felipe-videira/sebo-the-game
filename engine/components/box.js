class Box extends Component {

    _userRef;
    _color;
    _width;
    _height;
    _gradient;

    constructor (userRef, { 
        color = "#0095DD", 
        width = 10,
        height = 10, 
        opacity = 1,
        gradient = null 
    } = {}) {
        super(); 

        this._width = width;
        this._opacity = opacity;
        this._height = height;
        this._userRef = userRef;
        
        this.color = color;
        this.gradient = gradient;
    }

    get name () {
        return "Box";
    }
    
    get gradient () {
        return this._gradient;
    }

    set gradient (v) {
        if (!Array.isArray(v) || v.length !== 4) 
            throw Error("Invalid gradient");

        this._gradient = v;
    }

    get color () {
        return this._color;
    }

    set color (v) {
        if (typeof v === 'string' || (Array.isArray(v) && v.length < 2)) 
            throw Error("Invalid color");

        this._color = v;
    }

    start () {
        super.start();
        
        if (!this._userRef.transform) {
            throw Error('To use a Box you must have a transform!')
        }
    }

    draw (timestamp) {
        super.draw(timestamp); 
        
        Canvas.createBox({
            x: this._userRef.transform.x,
            y: this._userRef.transform.y,
            rotation: this._userRef.transform.rotation,
            color: this._color,
            gradient: this._gradient,
            opacity: this._opacity,
            width: this._width,
            height: this._height
        })
    }

}