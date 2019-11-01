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

    static checkCollisions (collider, callback) {
        if (Object.keys(this.instance._colliders).length <= 1) return;
        
        for (const key in this.instance._colliders) {
            if (key === collider.uuid) continue;

            callback(this.instance._colliders[key]);
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