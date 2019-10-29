class MainScene extends Scene {
    
    constructor () {
        super();
        
        this.addGameObjects([
            new Ball(),
            new Paddle()
        ])
    }
    
    get name () {
        return "MainScene";
    }
}