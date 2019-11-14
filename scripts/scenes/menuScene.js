class MenuScene extends Scene {

    _title = { 
        text: 'TEST',
        fontSize: 50,
    };

    _playButton = { 
        id: 'playButton',
        text: 'play',
        background: '#e04343',
        y: Canvas.center.y + 50,
        x: Canvas.center.x - 75,
        rotation: 0,
        color: '#fff',
        fontSize: 18,
        height: 25,
        width: 150,
    };

    _optionsButton = { 
        id: 'optionsButton',
        text: 'options',
        background: '#0095DD',
        y: Canvas.center.y + 100,
        x: Canvas.center.x - 75,
        rotation: 0,
        color: '#fff',
        fontSize: 18,
        height: 25,
        width: 150,
    };

    _flipDegrees = 7;
    _animationSpeed = 1;
    _buttonInAnimation = null;
    _targetRotation = null;
    _animProgress = 0;


    get name () {
        return "MenuScene";
    }

    start () {
        this.addMonoBehaviours([
            new Button({
                id: 'playButton',
                text: 'play',
                background: '#e04343',
                y: Canvas.center.y + 50,
                x: Canvas.center.x - 75,
                rotation: 0,
                color: '#fff',
                fontSize: 18,
                height: 25,
                width: 150,
            })
        ])

        this.getMonoBehaviour('playButton') // here
    }

    restart() {
        return;
    }
    
    draw () {
        super.draw();

        Canvas.displayText(this._title);

        // Canvas.createButton(
        //     this._playButton, 
        //     () => this._play(), 
        //     (e) => this._buttonHover(e, this._playButton, -this._flipDegrees)
        // );

        Canvas.createButton(
            this._optionsButton, 
            () => this._options(), 
            (e) => this._buttonHover(e, this._optionsButton)
        );

        this._animateButton();
    }

    _play () {
        SceneManager.setSceneActive('MainScene');
    }
    
    _options () {
        SceneManager.setSceneActive('OptionsScene');
    }

    _buttonHover (e = {}, button, degrees = this._flipDegrees) {
        if (e.id && button.rotation !== degToRad(degrees)) {
            this._targetRotation = degToRad(degrees); 
            this._buttonInAnimation = button;
        } else if (!e.id && button.rotation !== 0) {
            this._targetRotation = 0; 
            this._buttonInAnimation = button;
        } else {
            this._animProgress = 0;
            this._buttonInAnimation = null;
        }
    }

    _animateButton () {
        if (this._buttonInAnimation) {
            this._buttonInAnimation.rotation = 
                lerp(
                    this._buttonInAnimation.rotation, 
                    this._targetRotation, 
                    this._animProgress += this._animationSpeed * 0.1
                );

            if (this._animProgress >= 1) {
                this._animProgress = 0;
            }
        } 
    }
   
}