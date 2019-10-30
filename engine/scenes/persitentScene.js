class PersitentScene extends Scene {
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new EventEmitter(),
            new Input(),
            new Canvas(),
            new Collision()
        ])
    }
    
    get name () {
        return "PersitentScene";
    }
}