class OptionsScene extends Scene {

    get name () {
        return "OptionsScene";
    }

    draw () {
        super.draw();

        Canvas.displayText({ 
            text: 'In progress ;)',
            fontSize: 20
        });
        
        Canvas.createButton({ 
            text: '🡐 go back',
            color: '#fff',
            background: '#6c25da',
            y: Canvas.center.y + 60,
            x: Canvas.center.x - 75,
            color: '#fff',
            fontSize: 16,
            height: 25,
            width: 150,
        }, () => this._goBack());
    }

    _goBack () {
        SceneManager.setSceneActive('MenuScene');
    }
}