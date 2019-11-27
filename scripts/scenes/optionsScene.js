class OptionsScene extends Scene {

    _flipDegrees = -6;
    _animationSpeed = 1;

    get name () {
        return "OptionsScene";
    }

    start () {
        this.addMonoBehaviours([
            new GUIText({
                text: 'In progress ;)',
                fontSize: 25,
            }),

            new GUIButton({
                text: '🡐 go back',
                color: '#fff',
                background: '#6c25da',
                y: Canvas.center.y + 60,
                x: Canvas.center.x - 75,
                rotation: 0,
                color: '#f3f3f3',
                fontSize: 18,
                height: 25,
                width: 150,
            })
            .onFocus(button => this._onButtonHover(button, true))
            .onBlur(button => this._onButtonHover(button, false))
            .onClick(() => this._goBack()),
        ])
    }

    _goBack () {
        SceneManager.setSceneActive('MenuScene');
    }

    _onButtonHover (button, focused = true) {
        if (focused && button.rotation !== degToRad(this._flipDegrees)) {
            button.animate({ 
                rotation: degToRad(this._flipDegrees),
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