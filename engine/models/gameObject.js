class GameObject extends MonoBehaviour {
    
    transform = {
        x: 0,
        y: 0,
        rotation: 0
    };
    
    _components = {};
    _started = false;
    _name;

    constructor (
        name = '', 
        { 
            x = 0, 
            y = 0, 
            rotation = 0 
        } = {},
        componentsOrCallback = null, 
    ) {
        super();

        this._name = name;

        this.transform.x = x;
        this.transform.y = y;
        this.transform.rotation = rotation;

        componentsOrCallback && this.addComponents(componentsOrCallback);
    }

    get name () {
        if (this._name) return this._name;

        throw Error("This Game Object does not have a name!");
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
            if (!this._components[componentName].active) continue;
            
            this._components[componentName].update();
        }
    }

    draw (timestamp) {
        super.draw(timestamp);
        
        for (const componentName in this._components) {
            if (!this._components[componentName].active) continue;

            this._components[componentName].draw(timestamp);
        }
    }

    destroy () {
        for (const componentName in this._components) {
            this._components[componentName].destroy();
        }

        super.destroy();
    }

    addComponents (componentsOrCallback) {
        for (const component of this._validateComponents(componentsOrCallback)) {
            this.addComponent(component);
        }
    } 

    addComponent (componentOrCallback) {
        const component = this._validateComponent(componentOrCallback);
        
        this._components[component.name] = component;

        if (this._started) this._components[component.name].start();
    }

    getComponent (name) {
        const component = this._components[name] || {};

        return component.active && component;
    }

    _validateComponent (v) {
        if (v && typeof v === 'function') v = v(this);
        
        if (!v || !v.isComponent) {
            throw Error("You are tring to add something that is not a Component!");
        }

        return v;
    }

    _validateComponents (v) {
        return Array.isArray(v) ? v : v(this);
    }
}