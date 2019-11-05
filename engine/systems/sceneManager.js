//TODO: improve this
class SceneManager extends MonoBehaviour {
    
    _started = false;
    _activeScenes = {};

    constructor (activeScene) {
        super();

        if (!!SceneManager.instance) {
            return SceneManager.instance;
        }

        SceneManager.instance = this;

        this._addScene(activeScene);
        
        return this;
    }

    get name () {
        return "SceneManager";
    }

    get activeScenes () {
        throw Error("Do not access the activeScenes directly!");
    } 

    set activeScenes (v) {
        throw Error("Do not set the activeScenes directly!");
    } 

    start () {
        super.start();

        for (const sceneName in this._activeScenes) {
            this._activeScenes[sceneName].start();
        }

        this._started = true;
    }

    update () {
        super.update();

        for (const sceneName in this._activeScenes) {
            this._activeScenes[sceneName].update();
        }
    }

    draw (timestamp) {
        super.draw(timestamp);

        for (const sceneName in this._activeScenes) {
            this._activeScenes[sceneName].draw(timestamp);
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

    _addScene (scene) {
        this._validateScene(scene, false);
        
        this._activeScenes[scene.name] = scene;

        if (this._started) this._activeScenes[scene.name].start();
    }

    static removeScene (sceneName) {
        if (FORBIDDEN_SCENE_NAMES.includes(sceneName)) return false;

        return delete this.instance._activeScenes[sceneName];
    }

    _validateScene (v, checkName = true) {
        if (!v || !v.isScene) {
            throw Error("You are tring to add something that is not a Scene!");
        }
        
        if (checkName && FORBIDDEN_SCENE_NAMES.includes(v.name)) {
            throw Error("Invalid scene name!");
        }
    }

}