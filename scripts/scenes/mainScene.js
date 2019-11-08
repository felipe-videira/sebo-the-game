class MainScene extends Scene {

    _p1Color = "#0095DD";
    _p2Color = "#e04343";
    _pSpeed = 10
    _pRotationSpeed = 15;
    _pWidth = 75;
    _pHeight = 10;
    _p1X = (Canvas.dimensions.width / 2) + this._pWidth * .25;
    _p1Y = Canvas.dimensions.height - Canvas.dimensions.height / 3;
    _p2X = (Canvas.dimensions.width / 2) - this._pWidth * 1.25;
    _p2Y = Canvas.dimensions.height / 3;
    _alivePlayers = 2;
    
    get name () {
        return "MainScene";
    }

    start () {
        super.start();

        this.cleanMonoBehaviours();

        this.addMonoBehaviours([
            new Player("P1", {
                x: this._p1X,
                y: this._p1Y,
                rotation: degToRad(180),
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
        ]);

        this.getMonoBehaviour("P1").onDeath(() => this._onPlayerDeath);
        this.getMonoBehaviour("P2").onDeath(() => this._onPlayerDeath);
    }

    _onPlayerDeath () {
        this._alivePlayers--;

        if (this._alivePlayers <= 1) {
            SceneManager.reloadActiveScene();
        }
    }
}