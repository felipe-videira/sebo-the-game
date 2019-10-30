class EventEmitter extends MonoBehaviour {  
    
    _listeners = {}   
    
    constructor () {
        super();

        if (!!EventEmitter.instance) {
            return EventEmitter.instance;
        }

        EventEmitter.instance = this;

        return this;
    }

    get name () {
        return "EventEmitter";
    }

    static addListener (eventName, fn) {    
        this.instance._listeners[eventName] = this.instance._listeners[eventName] || [];    
        this.instance._listeners[eventName].push(fn);    
        return this;  
    }

    static on (eventName, fn) {    
        return this.addListener(eventName, fn);  
    }

    static once (eventName, fn) {   
        this.instance._listeners[eventName] = this.instance._listeners[eventName] || [];    
        const onceWrapper = () => {      
            fn();      
            this.off(eventName, onceWrapper);    
        }   
        this.instance._listeners[eventName].push(onceWrapper);    
        return this; 
    }

    static off (eventName, fn) {    
        return this.removeListener(eventName, fn);  
    }

    static removeListener (eventName, fn) {   
        let lis = this.instance._listeners[eventName];    
        if (!lis) return this;    
        for (let i = lis.length; i > 0; i--) {      
            if (lis[i] === fn) {        
                lis.splice(i,1);        
                break;      
            }    
        }    
        return this;  
    }

    static emit (eventName, ...args) {    
        let fns = this.instance._listeners[eventName];    
        if (!fns) return false;    
        fns.forEach((f) => {      
            f(...args);    
        });    
        return true;  
    }

    static listenerCount (eventName) {    
        let fns = this.instance._listeners[eventName] || [];    
        return fns.length;  
    }

    static rawListeners (eventName) {    
        return this.instance._listeners[eventName];  
    }
}