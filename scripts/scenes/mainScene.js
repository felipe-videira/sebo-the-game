class MainScene extends Scene {
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new GameManager(),
            new Player("P1", {
                x: (Canvas.dimensions.width / 2) - (Canvas.dimensions.width / 4),
                y: Canvas.dimensions.height / 2,
                width: 10,
                height: 75,
            }),
            new Player("P2", { 
                x: (Canvas.dimensions.width / 2) + (Canvas.dimensions.width / 4),
                y: Canvas.dimensions.height / 2,
                width: 10,
                height: 75,
                color: PLAYER_TWO_COLOR, 
                input: gameConfig.inputs.p2, 
            }),
        ])
    }
    
    get name () {
        return "MainScene";
    }
}