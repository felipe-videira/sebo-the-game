class CharacterController extends Component {
    
    _userRef;
    _speed;
    _input;
    
    constructor (userRef, { input, speed = 2 } = {}) {
        super(); 

        if (!isInput(input)) {
            throw Error('Invalid input type');
        }
        
        this._userRef = userRef;
        this._input = input;
        this._speed = speed;
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
            .move(Input.values[this._input].x, Input.values[this._input].y * -1, this._speed);
    }
}