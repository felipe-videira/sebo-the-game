class MenuScene extends Scene {

    _flipDegrees = 7;
    _animationSpeed = 1;

    get name () {
        return "MenuScene";
    }

    start () {
        super.start();

        this.addMonoBehaviours([
            new GUIText({
                text: 'SEBO',
                fontSize: 50,
            }),

            new GUIButton({
                id: 'playButton',
                text: 'play',
                background: '#e04343',
                y: Canvas.center.y + 50,
                x: Canvas.center.x - 75,
                rotation: 0,
                color: '#f3f3f3',
                fontSize: 18,
                height: 25,
                width: 150,
            })
            .onFocus(button => this._onButtonHover(button, this._flipDegrees, true))
            .onBlur(button => this._onButtonHover(button, this._flipDegrees, false))
            .onClick(() => this._play()),

            new GUIButton({
                id: 'optionsButton',
                text: 'options',
                background: '#0095DD',
                y: Canvas.center.y + 100,
                x: Canvas.center.x - 75,
                rotation: 0,
                color: '#f3f3f3',
                fontSize: 18,
                height: 25,
                width: 150,
            })
            .onFocus(button => this._onButtonHover(button, -this._flipDegrees, true))
            .onBlur(button => this._onButtonHover(button, -this._flipDegrees, false))
            .onClick(() => this._options()),
        ])
    }

    _play () {
        SceneManager.setSceneActive('MainScene');
    }
    
    _options () {
        SceneManager.setSceneActive('OptionsScene');
    }

    _onButtonHover (button, degrees = this._flipDegrees, focused = true) {
        if (focused && button.rotation !== degToRad(degrees)) {
            button.animate({ 
                rotation: degToRad(degrees),
                color: '#ffffff',
                fontSize: 19,
            }, this._animationSpeed)
        } else if (!focused && button.rotation !== 0) {
            button.animate({ 
                rotation: 0,
                color: '#f3f3f3',
                fontSize: 18,
            }, this._animationSpeed)
        } 
    }
}