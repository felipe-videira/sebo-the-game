class Component extends MonoBehaviour {
    
    get isComponent () {
        return true;
    }

    get name () {
        throw Error("This Component does not have a name!");
    }
}