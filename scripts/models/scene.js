class Scene extends MonoBehaviour {

    _monoBehaviours = [];

    constructor (monoBehaviours = []) {
        super();

        this.addMonoBehaviours(monoBehaviours)
    }

    get isScene () {
        return true;
    } 

    get name () {
        throw Error("This Scene does not have a name!");
    }

    start () {
        super.start();

        for (const monoBehaviour of this._monoBehaviours) {
            monoBehaviour.start();
        }
    }

    update () {
        super.update();

        for (const monoBehaviour of this._monoBehaviours) {
            monoBehaviour.update();
        }
    }

    addMonoBehaviours (monoBehaviours = []) {
        for (const monoBehaviour of monoBehaviours) {
            this.addGameObject(monoBehaviour)
        }
    } 

    addMonoBehaviour (monoBehaviour = null) {
        this._validateMonoBehaviour(monoBehaviour)
        
        this._monoBehaviours.push(monoBehaviour)
    }

    _validateMonoBehaviour (v) {
        if (!v || !v.isMonoBehaviour) {
            throw Error("You are tring to add something that is not a MonoBehaviour!")
        }
    }
}