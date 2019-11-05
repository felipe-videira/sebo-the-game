
let deltaTime;
let lastDtUpdate = Date.now();
let gameRunning = true;


const sceneManager = new SceneManager(new PersitentScene());

sceneManager.start();


const gameLoop = setInterval(() => {
    const now = Date.now();

    deltaTime = now - lastDtUpdate;

    lastDtUpdate = now;

    sceneManager.update()
}, 10);


(function animloop (timestamp) {
    sceneManager.draw(timestamp);

    gameRunning && window.requestAnimationFrame(animloop);
})();


const gameOver = () => {
    gameRunning = false;

    clearInterval(gameLoop);
};
