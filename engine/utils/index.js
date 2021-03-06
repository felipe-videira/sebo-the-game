const isInput = v => 
    !!Object.keys(gameConfig.inputs).find(key => v === gameConfig.inputs[key]);

const isNullOrEmpty = v => 
    v === null || 
    v === undefined || 
    v === false || 
    v === NaN || 
    v === "";

const uuid4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => 
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);

const degToRad = deg => deg * (Math.PI / 180);

const radToDeg = rad => rad * (180 / Math.PI);

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

const magnitude = (x, y) => Math.sqrt(x*x + y*y);

const normalize = (x, y) => {
    const d = magnitude(x, y);
    return { 
        x: x/d, 
        y: y/d 
    };
};

const distance = (ax, ay, bx, by) => Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));

const shadeColor = (color, percent) => {
    let R = parseInt(color.substring(1,3), 16);
    let G = parseInt(color.substring(3,5), 16);
    let B = parseInt(color.substring(5,7), 16);
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  
    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    return "#"+RR+GG+BB;
};

const lerp = (start, end, t) => {
    return start * (1 - t) + end * t
};

const invlerp = (a, b, v) => {
    return clamp((v - a) / (b - a), 0, 1);
};

const lerpColor = (a, b, amount) => { 
    let ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}