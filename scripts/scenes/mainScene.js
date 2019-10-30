class MainScene extends Scene {
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new GameManager(),
            new Ball("Ball1"),
            new Ball("Ball2", { 
                color: PLAYER_TWO_COLOR,
                initialPosition: {
                    x: Canvas.dimensions.width / 2,
                    y: Canvas.dimensions.height - 10
                },
            }),
            new Paddle("P1Paddle"),
            new Paddle("P2Paddle", { 
                color: PLAYER_TWO_COLOR, 
                input: gameConfig.inputs.p2 
            }),
        ])
    }
    
    get name () {
        return "MainScene";
    }
}