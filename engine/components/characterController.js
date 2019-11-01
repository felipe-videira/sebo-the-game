class CharacterController extends Component {
    
    _userRef;
    _speed;
    _rotationSpeed;
    _input;
    
    constructor (userRef, { 
        input, 
        speed = 2, 
        rotationSpeed = 2 
    } = {}) {
        super(); 

        if (!isInput(input)) {
            throw Error('Invalid input type');
        }
        
        this._userRef = userRef;
        this._input = input;
        this._speed = speed;
        this._rotationSpeed = rotationSpeed;
    }

    get name () {
        return "CharacterController";
    }

    start () {
        super.start();
        
        if (!this._userRef.getComponent("Rigidbody")) {
            throw Error('To use a CharacterController you must have a Rigidbody attached!');
        }
    }

    update () {
        super.update(); 

        this._userRef.getComponent('Rigidbody')
            .move(
                Input.values[this._input].x, 
                Input.values[this._input].y * -1, 
                this._speed,
                Input.values[this._input].rotation,
                this._rotationSpeed,
            );

    }
}