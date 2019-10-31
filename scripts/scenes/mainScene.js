class MainScene extends Scene {
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new GameManager(),
            new Player("P1", {
                x: (Canvas.dimensions.width / 2) - (Canvas.dimensions.width / 4),
                y: Canvas.dimensions.height / 2,
                width: 75,
                speed: 1,
                height: 10,
                color: '#fff'
            }),
            new Player("P2", { 
                x: (Canvas.dimensions.width / 2) + (Canvas.dimensions.width / 4),
                y: Canvas.dimensions.height / 2,
                speed: 1,
                width: 75,
                height: 10,
                color: '#fff',
                input: gameConfig.inputs.p2, 
            }),
        ])
    }
    
    get name () {
        return "MainScene";
    }
}