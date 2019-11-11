class MainScene extends Scene {

    _pSpeed = 10
    _pRotationSpeed = 5;
    _pWidth = 75;
    _pHeight = 10;
    _players = [{
        color: "#0095DD",
        x: (Canvas.dimensions.width / 2) + this._pWidth * .25,
        y: Canvas.dimensions.height - Canvas.dimensions.height / 4,
        rotation: degToRad(180),
    }, {
        color: "#e04343",
        x: (Canvas.dimensions.width / 2) - this._pWidth * 1.25,
        y: Canvas.dimensions.height / 4,
        rotation: 0,
    }, /* {
        color: "#20ce67",
        x: (Canvas.dimensions.width / 2) - this._pWidth * 1.25,
        y: Canvas.dimensions.height - Canvas.dimensions.height / 2.5,
        rotation: degToRad(180),
    }, {
        color: "#6c25da",
        x: (Canvas.dimensions.width / 2) + this._pWidth * .25,
        y: Canvas.dimensions.height / 2.5,
        rotation: 0,
    } */];

    _alivePlayers = [];
    _message;

    constructor () {
        super();

        this._init();
    }

    get name () {
        return "MainScene";
    }
    
    restart() {
        this.clear();
  
        this._init();
    }

    draw () {
        super.draw();
        
        this._message && Canvas.displayText({ text: this._message });
    }

    _init () {
        let index = 0;

        for (const player of this._players) {
            const tag = `Player_${index + 1}`;

            this.addMonoBehaviour(new Player(tag, {
                x: player.x,
                y: player.y,
                rotation: player.rotation,
                color: player.color,
                height: this._pHeight,
                width: this._pWidth,
                speed: this._pSpeed,
                rotationSpeed: this._pRotationSpeed,
                input: gameConfig.inputs[`p${index + 1}`],
            }));

            this._alivePlayers.push(tag);

            this.getMonoBehaviour(tag).onDeath(() => this._onPlayerDeath(tag));

            index++;
        }

        this._displayMessage('Fight!', 2000);
    }
  
    _displayMessage (message, lifespan = 5000) {
        this._message = message;

        setTimeout(() => this._message = '', lifespan);
    }

    _onPlayerDeath (tag) {
        if (this._alivePlayers.length < 1) return;

        this._alivePlayers.pop(tag);
        
        this._alivePlayers.length === 1 && this._endGame();
    }

    _endGame () {
        this._displayMessage(`${this._alivePlayers[0].replace('_', ' ')} wins!`, 2000);

        setTimeout(() => SceneManager.reloadActiveScene(), 2500);
    }
}