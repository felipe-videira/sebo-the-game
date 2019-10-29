const Canvas = new CanvasHandler();
const Input = new UserInput();
const Scenes = new SceneManager();

Scenes.addScene(new MainScene())

Scenes.start()

setInterval(() => {
    Scenes.update()
}, 10);
