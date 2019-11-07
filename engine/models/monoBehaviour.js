class MonoBehaviour {
    
    _active = true;

    get name () {
        throw Error('This MonoBehaviour does not have a name!');
    }

    get isMonoBehaviour () {
        return true;
    } 

    get active () {
        return this._active;
    }

    setActive (v) {
        this._active = !!v; 
    }

    onDestroy(callback) {
        if (typeof callback !== 'function') 
            throw Error("this is not a function");

        this._onDestroy = callback;
    }

    start () {}

    update () {}

    draw (timestamp) {}
    
    destroy () {
        this._onDestroy && this._onDestroy();

        delete this;
    }
}