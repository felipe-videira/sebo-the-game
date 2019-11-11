class MenuScene extends Scene {

    _buttonDefault = {
        x: Canvas.center.x - 75,
        color: '#fff',
        fontSize: 18,
        height: 25,
        width: 150,
    };

    get name () {
        return "MenuScene";
    }
    
    draw () {
        super.draw();

        Canvas.displayText({ 
            text: 'TEST',
            fontSize: 50,
        });

        Canvas.createButton({ 
            text: 'play',
            background: '#e04343',
            // rotation: degToRad(5),
            y: Canvas.center.y + 50,
            ...this._buttonDefault
        }, () => this._play());

        Canvas.createButton({ 
            text: 'options',
            background: '#0095DD',
            y: Canvas.center.y + 100,
            ...this._buttonDefault
        }, () => this._options());
    }

    _play () {
        SceneManager.setSceneActive('MainScene');
    }
    
    _options () {
        SceneManager.setSceneActive('OptionsScene');
    }
  
}