class EventEmitter extends MonoBehaviour {  
    _listeners = {}   
    
    constructor () {
        if (!!EventEmitter.instance) {
            return EventEmitter.instance;
        }

        EventEmitter.instance = this;

        return this;
    }

    addListener (eventName, fn) {    
        this._listeners[eventName] = this._listeners[eventName] || [];    
        this._listeners[eventName].push(fn);    
        return this;  
    }

    on (eventName, fn) {    
        return this.addListener(eventName, fn);  
    }

    once (eventName, fn) {   
        this._listeners[eventName] = this._listeners[eventName] || [];    
        const onceWrapper = () => {      
            fn();      
            this.off(eventName, onceWrapper);    
        }   
        this._listeners[eventName].push(onceWrapper);    
        return this; 
    }

    off (eventName, fn) {    
        return this.removeListener(eventName, fn);  
    }

    removeListener (eventName, fn) {   
        let lis = this._listeners[eventName];    
        if (!lis) return this;    
        for (let i = lis.length; i > 0; i--) {      
            if (lis[i] === fn) {        
                lis.splice(i,1);        
                break;      
            }    
        }    
        return this;  
    }

    emit (eventName, ...args) {    
        let fns = this._listeners[eventName];    
        if (!fns) return false;    
        fns.forEach((f) => {      
            f(...args);    
        });    
        return true;  
    }

    listenerCount (eventName) {    
        let fns = this._listeners[eventName] || [];    
        return fns.length;  
    }

    rawListeners (eventName) {    
        return this._listeners[eventName];  
    }
}