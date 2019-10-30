const isInput = v => {
    return !!Object.keys(gameConfig.inputs).find(key => v === gameConfig.inputs[key])
};

const isNullOrEmpty = v => {
    return v === null || 
        v === undefined || 
        v === false || 
        v === NaN || 
        v === "";
};