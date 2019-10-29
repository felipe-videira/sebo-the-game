class MainScene extends Scene {
    
    constructor () {
        this.addGameObjects([
            new Ball(),
            new Paddle()
        ])
    }
    
    get name () {
        return "MainScene";
    }
}