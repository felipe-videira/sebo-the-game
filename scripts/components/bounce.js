class Bounce extends Component {

    _speed;
    _x = 1;
    _y = -1;

    constructor (userRef, { speed = 2 } = {}) {
        super(); 

        this._speed = speed;
        this._userRef = userRef;
    }

    get name () {
        return "Bounce";
    }

    start () {
        super.start();

        if (!this._userRef.transform) {
            throw Error('To use a Bounce you must have a transform!');
        }

        if (!this._userRef.getComponent("Collision")) {
            throw Error('To use a Bounce you must have a Collision attached!');
        }

        if (!this._userRef.getComponent("Rigidbody")) {
            throw Error('To use a Bounce you must have a Rigidbody attached!');
        }

        this._userRef.getComponent("Collision")
            .setOnCollision(collision => this.onCollision(collision));

        this._userRef.getComponent('Rigidbody')
            .setPosition(Canvas.dimensions.width / 2, Canvas.dimensions.width / 2);
    }

    update () {
        super.update();

        this._userRef.getComponent("Rigidbody").move(this._x, this._y, this._speed);
    }

    onCollision ({ onX, onY }) {
        if (onX) this._x = -this._x;
        
        if (onY) this._y = -this._y;
    }
}
 