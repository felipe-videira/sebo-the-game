//TODO: improve this
class SceneManager extends MonoBehaviour {
    
    _started = false;
    _activeScenes = {};

    constructor (activeScenes = []) {
        super();

        if (!!SceneManager.instance) {
            return SceneManager.instance;
        }

        SceneManager.instance = this;

        SceneManager.addScenes(activeScenes);
        
        return this;
    }

    get activeScenes () {
        throw Error("Do not access the activeScenes directly!");
    } 

    set activeScenes (v) {
        throw Error("Do not set the activeScenes directly!");
    } 

    start () {
        for (const sceneName in this._activeScenes) {
            this._activeScenes[sceneName].start();
        }

        this._started = true;
    }

    update () {
        for (const sceneName in this._activeScenes) {
            this._activeScenes[sceneName].update();
        }
    }

    static addScenes (scenes) {
        for (const scene of scenes) {
            this.addScene(scene);
        }
    }
    
    static addScene (scene) {
        this.instance._validateScene(scene);
        
        this.instance._activeScenes[scene.name] = scene;

        if (this.instance._started) this.instance._activeScenes[scene.name].start();
    }

    static removeScene (sceneName) {
        if (sceneName === 'PersitentScene') return false;

        return delete this.instance._activeScenes[sceneName];
    }

    _validateScene (v) {
        if (!v || !v.isScene) {
            throw Error("You are tring to add something that is not a Scene!");
        }
    }

}