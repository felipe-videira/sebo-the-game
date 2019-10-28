class MonoBehaviour {

    constructor () {
        EvtEmitter.on('start', () => this.start())
        EvtEmitter.on('update', () => this.update())
    }

    start () {}

    update () {}
}