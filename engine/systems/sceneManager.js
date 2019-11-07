
class SceneManager extends MonoBehaviour {
    
    _started = false;
    _scenes = {};
    _activeSceneName;

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

    start () {
        super.start();
        
        for (const name in this._scenes) {
            if (!this._scenes[name].active) continue;
            
            this._scenes[name].start();
        }
    }

    update () {
        super.update();

        for (const name in this._scenes) {
            if (!this._scenes[name].active) continue;
            
            this._scenes[name].update();
        }
    }

    draw (timestamp) {
        super.draw(timestamp);

        for (const name in this._scenes) {
            if (!this._scenes[name].active) continue;
            
            this._scenes[name].draw();
        }
    }

    static addScenes (scenes) {
        for (const scene of scenes) {
            this.addScene(scene);
        }
    }
    
    static addScene (scene, active = false) {
        this.instance._validateScene(scene);
        
        this.instance._scenes[scene.name] = scene;

        if (active) this.setSceneActive(scene.name);
    }
    
    static setSceneActive (sceneName) {
        if (!this.instance._scenes[sceneName]) throw Error("Scene not found");

        this.instance._scenes[this.instance._activeSceneName] && 
            this.instance._scenes[this.instance._activeSceneName].setActive(false);
        
        this.instance._activeSceneName = sceneName;
        
        this.instance._scenes[this.instance._activeSceneName].setActive(true);
        this.instance._scenes[this.instance._activeSceneName].start();
    }

    static reloadActiveScene () {
        this.instance._scenes[this._activeSceneName].start();
    }

    static removeScene (sceneName) {
        if (FORBIDDEN_SCENE_NAMES.includes(sceneName)) return false;

        return delete this.instance._scenes[sceneName];
    }

    _addScene (scene) {
        this._validateScene(scene, false);
        
        this._scenes[scene.name] = scene;
        
        this._scenes[scene.name].start();
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