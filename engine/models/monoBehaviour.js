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
         
        this._active ? this.onEnable() : this.onDisable()
    }

    onDestroy(callback) {
        if (typeof callback !== 'function') 
            throw Error("this is not a function");

        this._onDestroy = callback;
    }

    onEnable () {}

    onDisable () {}

    start () {}

    update () {}

    draw (timestamp) {}
    
    destroy () {
        this.onDisable();
        
        this._onDestroy && this._onDestroy();

        delete this;
    }
}