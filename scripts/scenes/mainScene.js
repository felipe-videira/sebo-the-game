class MainScene extends Scene {

    _pSpeed = 15
    _pRotationSpeed = 5;
    _pWidth = 75;
    _pHeight = 10;
    _pDamage = 10;
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


    get name () {
        return "MainScene";
    }
    
    onEnable () {
        super.onEnable();
        
        this._displayMessage('Fight!', 2000);
    }


    start () {
        super.start();
        
        for (let i = 0; i < this._players.length; i++) {
            const { x, y, color, rotation } = this._players[i];

            const tag = `Player_${i + 1}`;

            this.addMonoBehaviour(new Player(tag, {
                x,
                y,
                rotation,
                color,
                height: this._pHeight,
                width: this._pWidth,
                damage: this._pDamage,
                speed: this._pSpeed,
                rotationSpeed: this._pRotationSpeed,
                input: gameConfig.inputs[`p${i + 1}`],
            }));

            this._alivePlayers.push(tag);

            this.getMonoBehaviour(tag).onDeath(() => this._onPlayerDeath(tag));
        }
    }

    draw () {
        super.draw();
        
        this._message && Canvas.displayText({ text: this._message });
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