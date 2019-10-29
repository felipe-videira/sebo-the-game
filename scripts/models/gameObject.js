class GameObject extends MonoBehaviour {
    
    transform = {
        x: 0,
        y: 0
    };
    _components = {};
    _started = false;
    _displayName;

    constructor (displayName) {
        super();
        
        this._displayName = displayName;
    }

    get displayName () {
        return this._displayName;
    }

    get isGameObject () {
        return true;
    } 

    get components () {
        throw Error("Do not access the components directly!")
    } 

    set components (v) {
        throw Error("Do not set the components directly!")
    } 

    start () {
        super.start();

        for (const componentName in this._components) {
            this._components[componentName].start();
        }

        this._started = true;
    }

    update () {
        super.update();
        
        for (const componentName in this._components) {
            this._components[componentName].update();
        }
    }

    addComponents (components = []) {
        for (const component of components) {
            this.addComponent(component);
        }
    } 

    addComponent (component = null) {
        this._validateComponent(component);
        
        this._components[component.displayName] = component;

        if (this._started) this._components[component.displayName].start();
    }

    getComponent (name) {
        return this._components[name];
    }

    _validateComponent (v) {
        if (!v || !v.isComponent) {
            throw Error("You are tring to add something that is not a Component!");
        }
    }
}