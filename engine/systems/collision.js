class Collision extends MonoBehaviour {
    
    _colliders = {};

    constructor () {
        super();

        if (!!Collision.instance) {
            return Collision.instance;
        }

        Collision.instance = this;

        return this;
    }

    get name () {
        return "Collision";
    }

    update () {
        super.update();

        this._checkCollisions();
    }

    _checkCollisions () {
        if (Object.keys(this._colliders).length <= 1) return;

        for (const keyA in this._colliders) {
            for (const keyB in this._colliders) {
                if (keyA === keyB) continue;
                
                this._colliders[keyA].detectCollision(this._colliders[keyB]);
            } 
        } 
    }

    static subscribeCollider (v) {
        const collider = this.instance._validateCollider(v);

        this.instance._colliders[collider.uuid] = collider;
    }

    _validateCollider (v) {
        if (!v && !v.isCollider) {
            throw Error("You are tring to add something that is not a Collider!");
        }

        return v;
    }
}