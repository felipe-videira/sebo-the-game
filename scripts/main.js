const sceneManager = new SceneManager([ 
    new PersitentScene(),
    new MainScene() 
]);

sceneManager.start();

setInterval(() => {
    sceneManager.update()
}, 10);
