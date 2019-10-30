const sceneManager = new SceneManager([ 
    new PersitentScene(),
]);

sceneManager.start();

const gameLoop = setInterval(() => {
    sceneManager.update()
}, 10);

const gameOver = () => {
    clearInterval(gameLoop);
};
