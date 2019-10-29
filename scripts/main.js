const Event = new EventEmitter();
const Input = new UserInput();
const Canvas = new CanvasHandler();
const Scenes = new SceneManager();

Scenes.addScene(new MainScene())

Scenes.start();
Canvas.start();

setInterval(() => {
    Canvas.update();
    Scenes.update();
}, 10);
