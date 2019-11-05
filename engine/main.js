
const sceneManager = new SceneManager(new PersitentScene());
let lastDtUpdate = Date.now();
let _dt;

sceneManager.start();

const gameLoop = setInterval(() => {
    const now = Date.now();

    _dt = now - lastDtUpdate;

    lastDtUpdate = now;

    sceneManager.update()
}, 10);


const deltaTime = () => _dt;

const gameOver = () => {
    clearInterval(gameLoop);
};
