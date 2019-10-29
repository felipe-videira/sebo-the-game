//TODO: improve this
class SceneManager extends MonoBehaviour {
    
    _started = false;
    _activeScenes = {};

    constructor (activeScenes = []) {
        super();

        this.addScenes(activeScenes);
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

    addScenes (scenes) {
        for (const scene of scenes) {
            this.addScene(scene);
        }
    }
    
    addScene (scene) {
        this._validateScene(scene);
        
        this._activeScenes[scene.name] = scene;

        if (this._started) this._activeScenes[scene.name].start();
    }

    removeScene (sceneName) {
        return delete this._activeScenes[sceneName];
    }

    _validateScene (v) {
        if (!v || !v.isScene) {
            throw Error("You are tring to add something that is not a Scene!");
        }
    }

}