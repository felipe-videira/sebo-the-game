/* Services */
const EvtEmitter = new EventEmitter();
const Canvas = new CanvasHandler();
const Input = new UserInput()


/* Game Objects */
new Paddle();
new Ball();


/* Initializing */
EvtEmitter.emit('start');


/* Game loop */
setInterval(() => {
    EvtEmitter.emit('update');
}, 10);
