class Scene extends MonoBehaviour {

    _gameObjects = [];

    constructor (gameObjects = []) {
        this.addGameObjects(gameObjects)
    }

    get isScene () {
        return true;
    } 

    get name () {
        throw Error("This Scene does not have a name!");
    }

    start () {
        super.start();

        for (const gameObject of this._gameObjects) {
            gameObject.start();
        }
    }

    update () {
        super.update();

        for (const gameObject of this._gameObjects) {
            gameObject.update();
        }
    }

    addGameObjects (gameObjects = []) {
        for (const gameObject in gameObjects) {
            this.addGameObject(gameObject)
        }
    } 

    addGameObject(gameObject = null) {
        this._validateGameObject(gameObject)
        
        this._gameObjects.push(gameObject)
    }

    _validateGameObject (v) {
        if (!v || !v.isGameObject) {
            throw Error("You are tring to add something that is not a GameObject!")
        }
    }
}