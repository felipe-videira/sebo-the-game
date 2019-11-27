class GUI extends MonoBehaviour {

    _x;
    _y;
    _id;

    _targetAnimValues = {}
    _animProgress = {}
    _animSpeed = 1

    constructor() {
        super();

        this._id = uuid4();
    }

    get name () {
        return this._id;
    }

    draw (timestamp) {
        super.draw(timestamp); 

        this._animate();
    }
    
    animate (targetValues, speed = 1) {
        if (!Object.keys(targetValues).length) return

        this._targetAnimValues = targetValues;
        this._animSpeed = speed;
        this._animProgress = {};

        return this;
    }

    _animate () {
        if (!Object.keys(this._targetAnimValues).length) return

        for (const property in this._targetAnimValues) {
            if (!this._animProgress[property]) {
                this._animProgress[property] = 0;
            }
     
            this._animProgress[property] += this._animSpeed * 0.1
            
            //TODO: improve this for objects and arrays
            
            if (typeof this[`_${property}`] === 'number') {
                this[`_${property}`] = lerp(this[`_${property}`], this._targetAnimValues[property], this._animProgress[property]);
            } 
            else if (typeof this[`_${property}`] === 'string' && property.indexOf('color') !== -1) {
                this[`_${property}`] = lerpColor(this[`_${property}`], this._targetAnimValues[property], this._animProgress[property]);
            } 
            else if (typeof this[`_${property}`] === 'string') {
                this[`_${property}`] = this._targetAnimValues[property]
                this._animProgress[property] = 1
            }

            if (this._animProgress[property] >= 1) {
                delete this._targetAnimValues[property]
            }
        }
    }
}