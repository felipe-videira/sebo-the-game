class MainScene extends Scene {
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new GameManager(),
            new Ball("Ball1"),
            new Ball("Ball2", { 
                color: PLAYER_TWO_COLOR,
                initialPosition: {
                    x: (Canvas.dimensions.width - 5) / 2,
                    y: Canvas.dimensions.height - 5
                },
            }),
            new Paddle("P1Paddle", {
                width: 10,
                height: 75,
                initialPosition: {
                    x: (Canvas.dimensions.width - 5) / 2,
                    y: Canvas.dimensions.height - 75
                },
            }),
            new Paddle("P2Paddle", { 
                width: 10,
                height: 75,
                color: PLAYER_TWO_COLOR, 
                input: gameConfig.inputs.p2, 
                initialPosition: {
                    x: (Canvas.dimensions.width - 15) / 2,
                    y: Canvas.dimensions.height - 75
                },
            }),
        ])
    }
    
    get name () {
        return "MainScene";
    }
}