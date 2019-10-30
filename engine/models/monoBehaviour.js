class MonoBehaviour {
    
    get name () {
        throw Error('This MonoBehaviour does not have a name!');
    }

    get isMonoBehaviour () {
        return true;
    } 

    start () {}

    update () {}
}