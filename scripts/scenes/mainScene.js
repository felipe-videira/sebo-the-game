class MainScene extends Scene {

    _p1Color = '#fff' //"#0095DD";
    _p2Color = '#fff' //"#e04343";
    _pSpeed = 10
    _pRotationSpeed = 5;
    _pWidth = 75;
    _pHeight = 10;
    _p1Y = Canvas.dimensions.height / 2;
    _p2Y = Canvas.dimensions.height / 2;
    _p1X = (Canvas.dimensions.width / 2) + this._pWidth *.25;
    _p2X = (Canvas.dimensions.width / 2) - this._pWidth *1.25;
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new GameManager(),
            new Player("P1", {
                x: this._p1X,
                y: this._p1Y,
                color: this._p1Color,
                height: this._pHeight,
                width: this._pWidth,
                speed: this._pSpeed,
                rotationSpeed: this._pRotationSpeed,
                input: gameConfig.inputs.p1, 
            }),
            new Player("P2", { 
                x: this._p2X,
                y: this._p2Y,
                color: this._p2Color,
                height: this._pHeight,
                width: this._pWidth,
                speed: this._pSpeed,
                rotationSpeed: this._pRotationSpeed,
                input: gameConfig.inputs.p2, 
            }),
        ])
    }
    
    get name () {
        return "MainScene";
    }
}