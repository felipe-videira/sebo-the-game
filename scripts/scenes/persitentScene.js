class PersitentScene extends Scene {
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new EventEmitter(),
            new UserInput(),
            new CanvasHandler(),
        ])
    }
    
    get name () {
        return "PersitentScene";
    }
}