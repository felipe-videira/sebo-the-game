const isInput = v => 
    !!Object.keys(gameConfig.inputs).find(key => v === gameConfig.inputs[key])

const isNullOrEmpty = v => 
    v === null || 
    v === undefined || 
    v === false || 
    v === NaN || 
    v === "";

const uuid4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => 
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);

const degToRad = deg => deg * Math.PI / 180;

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

const magnitude = (x, y) => Math.sqrt(x*x + y*y);

const normalize = (x, y) => {
    const d = magnitude(x, y);
    return { 
        x: x/d, 
        y: y/d 
    };
}