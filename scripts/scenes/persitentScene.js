class PersitentScene extends Scene {
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new EventEmitter(),
            new Input(),
            new Canvas(),
        ])
    }
    
    get name () {
        return "PersitentScene";
    }
}