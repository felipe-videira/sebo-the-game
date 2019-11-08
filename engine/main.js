const _canvas = new Canvas();
const _sceneManager = new SceneManager(new PersitentScene());

_canvas.start();
_sceneManager.start();

const _gameStartTime = Date.now();
let _lastDtUpdate = Date.now();
let _gameRunning = true;
let _deltaTime;


const gameLoop = setInterval(() => {
    const now = Date.now();
    _deltaTime = now - _lastDtUpdate;
    _lastDtUpdate = now;
    _sceneManager.update()
}, 10);


(function animloop (timestamp) {
    _canvas.update();
    _sceneManager.draw(timestamp);
    _gameRunning && window.requestAnimationFrame(animloop, Canvas.canvas);
})();


const deltaTime = () => _deltaTime;


const time = () => Date.now() - _gameStartTime;


const gameOver = () => {
    _gameRunning = false;
    clearInterval(gameLoop);
};
