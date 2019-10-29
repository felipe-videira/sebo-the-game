class MainScene extends Scene {
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new Ball(),
            new Paddle()
        ])
    }
    
    get name () {
        return "MainScene";
    }
}