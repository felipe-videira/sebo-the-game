class MainScene extends Scene {

    _pSpeed = 15
    _pRotationSpeed = 5;
    _pWidth = 75;
    _pHeight = 10;
    _pDamage = 10;
    _players = [{
        tag: 'Player_1',
        input: 'p2',
        color: "#e04343",
        x: (Canvas.dimensions.width / 2) - this._pWidth * 1.25,
        y: Canvas.dimensions.height / 4,
        rotation: 0,
    }, {
        tag: 'Player_2',
        input: 'p1',
        color: "#0095DD",
        x: (Canvas.dimensions.width / 2) + this._pWidth * .25,
        y: Canvas.dimensions.height - Canvas.dimensions.height / 4,
        rotation: degToRad(180),
    }, /* {
        tag: 'Player_3',
        input: 'p3',
        color: "#20ce67",
        x: (Canvas.dimensions.width / 2) - this._pWidth * 1.25,
        y: Canvas.dimensions.height - Canvas.dimensions.height / 2.5,
        rotation: degToRad(180),
    }, {
        tag: 'Player_4',
        input: 'p4',
        color: "#6c25da",
        x: (Canvas.dimensions.width / 2) + this._pWidth * .25,
        y: Canvas.dimensions.height / 2.5,
        rotation: 0,
    } */];

    _score = {};
    _alivePlayers = [];
    _messageTimeout = null;

    get name () {
        return "MainScene";
    }
    
    onEnable () {
        super.onEnable();

        this._resetScore();
    }

    restart () {
        this._score[this._alivePlayers[0]]++;

        this._alivePlayers = [];

        super.restart();
    }

    start () {        
        for (const player of this._players) {
            this.addMonoBehaviour(new Player(player.tag, {
                x: player.x,
                y: player.y,
                rotation: player.rotation,
                color: player.color,
                height: this._pHeight,
                width: this._pWidth,
                damage: this._pDamage,
                speed: this._pSpeed,
                rotationSpeed: this._pRotationSpeed,
                input: gameConfig.inputs[player.input],
            }));

            this._alivePlayers.push(player.tag);

            this.getMonoBehaviour(player.tag)
                .onDeath(() => this._onPlayerDeath(player.tag));
        }

        if (!Object.keys(this._score).length) this._resetScore();
        
        this.addMonoBehaviours([
            new GUIText({
                id: 'ScoreText',
                text: this._players.map((o, i) => ({
                    text: `${this._score[o.tag]}`,
                    color: o.color,
                    fontSize: 30,
                })),
                y: Canvas.center.y - (Canvas.center.y - 30),
                fontSize: 30,
                separator: 'x',
            }),
            new GUIText({ id: 'MessageText', spacing: 7 }),
        ])

        this._displayMessage('Fight!', 2000);
    }

    _resetScore () {
        this._players.forEach(({ tag }) => {
            this._score[tag] = 0
        })
    }

    _displayMessage (message, lifespan = 5000) {
        this.getMonoBehaviour('MessageText').text = message;

        setTimeout(() => {
            (this.getMonoBehaviour('MessageText') || {}).text = '';
        }, lifespan);
    }

    _onPlayerDeath (tag) {
        if (this._alivePlayers.length <= 1) return;

        this._alivePlayers.splice(this._alivePlayers.indexOf(tag), 1);
        
        this._alivePlayers.length === 1 && this._endGame();
    }

    _endGame () {
        const [ lastPlayer ] = this._alivePlayers;

        this._displayMessage([{
            text: lastPlayer.replace('_', ' '),
            color: this._players.find(o => o.tag === lastPlayer).color
        }, {
            text: 'wins!'
        }], 2000);

        setTimeout(() => this.restart(), 2500);
    }

}