class Collision extends MonoBehaviour {
    
    _colliders = [];

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
        
        for (const collA of this._colliders) {
            for (const collB of this._colliders) {
                collA.detectCollision([
                    Canvas.dimensions.width, 
                    collB.x
                ], [
                    Canvas.dimensions.height,
                    collB.y
                ])
            } 
        } 
    }

    static subscribeCollider (collider) {
        this.instance._colliders.push(this.instance._validateCollider(collider));
    }

    _validateCollider (v) {
        if (!v && !v.isCollider) {
            throw Error("You are tring to add something that is not a Collider!");
        }

        return v;
    }
}