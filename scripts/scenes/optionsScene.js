class OptionsScene extends Scene {

    get name () {
        return "OptionsScene";
    }

    start () {
        this.addMonoBehaviours([
            new GUIText({
                text: 'In progress ;)',
                fontSize: 20,
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
        button.animate({ 
            color: focused ? '#ffffff' : '#f3f3f3',
            fontSize: focused ? 19 : 18,
            height: focused ? 35 : 25,
            width: focused ? 160 : 150,
        }, 1)
    }
}