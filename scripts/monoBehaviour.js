class MonoBehaviour {

    _components = {}

    constructor () {
        EvtEmitter.on('start', () => this.start())
        EvtEmitter.on('update', () => this.update())
    }

    get components () {
        throw Error("Do not access the components directly!")
    } 

    set components (v) {
        throw Error("Do not set the components directly!")
    } 

    start () {}

    update () {}

    addComponent (component = null) {
        this._validateComponent(component)
        
        this._components[component.displayName] = component
    }

    addComponents (components = []) {
        for (const component in components) {
            this._validateComponent(component)

            this._components[component.displayName] = component
        }
    }   

    getComponent (name) {
        return this._components[name]
    }

    _validateComponent (v) {
        if (!v || !v.isComponent) {
            throw Error("You are tring to add something that is not a component!")
        }
    }
}