class Circle extends Component {
    
    _color;
    _radius;

    constructor (userRef, { color = "#0095DD", radius = 10 } = {}) {
        super(); 

        this._color = color;
        this._radius = radius;
        this._userRef = userRef;
    }

    get name () {
        return "Circle";
    }

    start () {
        super.start();
        
        if (!this._userRef.transform) {
            throw Error('To use a Circle you must have a transform!')
        }
    }

    update () {
        super.update();
        
        Canvas.createCircle({
            x: this._userRef.transform.x, 
            y: this._userRef.transform.y,  
            radius: this._radius, 
            color: this._color,
        });
    }
}
 