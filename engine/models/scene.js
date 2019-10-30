class Scene extends MonoBehaviour {

    _name;
    _monoBehaviours = {};

    constructor (name = '', mBsOrCallaback = null) {
        super();

        this._name = name;

        mBsOrCallaback && this.addMonoBehaviours(mBsOrCallaback)
    }

    get isScene () {
        return true;
    } 

    get name () {
        if (this._name) return this._name;

        throw Error("This Scene does not have a name!");
    }

    start () {
        super.start();

        for (const name in this._monoBehaviours) {
            this._monoBehaviours[name].start();
        }

        this._started = true;
    }

    update () {
        super.update();
        
        for (const name in this._monoBehaviours) {
            this._monoBehaviours[name].update();
        }
    }

    addMonoBehaviours (mBsOrCallaback = []) {
        for (const mb of this._validateMonoBehaviours(mBsOrCallaback)) {
            this.addMonoBehaviour(mb);
        }
    } 

    addMonoBehaviour (mBOrCallaback) {
        const monoBehaviour = this._validateMonoBehaviour(mBOrCallaback)
        
        this._monoBehaviours[monoBehaviour.name] = monoBehaviour;

        if (this._started) this._monoBehaviours[monoBehaviour.name].start();
    }

    getMonoBehaviour (name) {
        return this._monoBehaviours[name];
    }

    _validateMonoBehaviour (v) {
        if (v && typeof v === 'function') v = v(this);

        if (!v || !v.isMonoBehaviour) {
            throw Error("You are tring to add something that is not a MonoBehaviour!")
        }

        return v;
    }

    _validateMonoBehaviours (v) {
        return Array.isArray(v) ? v : v(this);
    }
}