
let deltaTime;
let lastDtUpdate = Date.now();
let gameRunning = true;


const canvas = new Canvas();
const sceneManager = new SceneManager(new PersitentScene());

canvas.start();
sceneManager.start();


const gameLoop = setInterval(() => {
    const now = Date.now();

    deltaTime = now - lastDtUpdate;

    lastDtUpdate = now;

    sceneManager.update()
}, 10);


(function animloop (timestamp) {
    canvas.update();

    sceneManager.draw(timestamp);

    gameRunning && window.requestAnimationFrame(animloop, Canvas.canvas);
})();


const gameOver = () => {
    gameRunning = false;

    clearInterval(gameLoop);
};
