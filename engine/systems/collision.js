class Collision extends MonoBehaviour {
    
    _colliders = {};

    constructor () {
        super();

        if (!!Collision.instance) {
            return Collision.instance;
        }

        Collision.instance = this;

        return this;
    }

    get name () {
        return "Collision";
    }

    static checkCollisions (collider, callback) {
        if (Object.keys(this.instance._colliders).length <= 1) return;
        
        for (const key in this.instance._colliders) {
            if (key === collider.uuid) continue;

            callback(this.instance._colliders[key]);
        } 
    }

    static subscribeCollider (v) {
        const collider = this.instance._validateCollider(v);

        this.instance._colliders[collider.uuid] = collider;
    }
    
    static boxCollision (
        {
            aX, 
            aY, 
            aWidth, 
            aHeight, 
            bX, 
            bY, 
            bWidth, 
            bHeight
        } = {}, 
        drawCollider = false, 
        colliderStyle = { 
            color: 'transparent', 
            borderColor: 'green' 
        }
    ) {
        if (drawCollider) Canvas.createBox({ 
            x: aX,
            y: aY,
            width: aWidth,
            height: aHeight,
            ...colliderStyle 
        })
        return aX <= bX + bWidth &&
            aX + aWidth >= bX &&
            aY <= bY + bHeight &&
            aY + aHeight >= bY;
    }
    
    static circleCollision (
        {
            aX, 
            aY, 
            aRadius, 
            bX, 
            bY, 
            bRadius
        } = {}, 
        drawCollider = false, 
        colliderStyle = { 
            color: 'transparent', 
            borderColor: 'green'
        }
    ) {
       if (drawCollider) Canvas.createCircle({ 
            x: aX,
            y: aY,
            radius: aRadius,
            ...colliderStyle 
        })

        return Math.sqrt(((aX - bX) * (aX - bX)) + ((aY - bY) * (aY - bY))) < (aRadius + bRadius);
    };
    
    static SATCollision (
        {
            aX, 
            aY, 
            aRotation,
            aWidth = null, 
            aHeight = null, 
            aSides = null,
            aRadius = null,
            aIsRect = false,
            bX, 
            bY,
            bRotation, 
            bWidth = null,
            bHeight = null,
            bSides = null,
            bRadius = null,
            bIsRect = false,
        } = {}, 
        drawCollider = false, 
        colliderStyle = { 
            color: 'transparent', 
            borderColor: 'green' 
        }
    ) {
        const aPoints = 
            this.instance._getAxis(aX, aY, aRotation, aSides, aWidth, aHeight, aRadius, aIsRect)
        const bPoints = 
            this.instance._getAxis(bX, bY, bRotation, bSides, bWidth, bHeight, bRadius, bIsRect)
        
        let md = Infinity 
        for (const a of aPoints) {
            if (drawCollider) Canvas.createCircle({ 
                x: a.x, 
                y: a.y, 
                radius: a.radius || 2, 
                ...colliderStyle
            })
            for (const b of bPoints) {
                const d = Math.sqrt(((a.x - b.x) * (a.x - b.x)) + ((a.y - b.y) * (a.y - b.y)))
                if (d < md) md = d
            }
        }
        return //?
    }

    _validateCollider (v) {
        if (!v && !v.isCollider) {
            throw Error("You are tring to add something that is not a Collider!");
        }

        return v;
    }

    _getAxis = (
        x,
        y,
        rotation,
        sides,
        width = null,
        height = null,
        radius = null,
        rect = false
    ) => {
        // needs to be tested
        if (radius) return [{ x, y, radius }]
  
        if (rect) {
            const cx = x + (width / 2)
            const cy = y + (height / 2)
            rotation = -rotation
            return [
                this._rotate(cx, cy, x, y, rotation),
                this._rotate(cx, cy, x, y + height, rotation),
                this._rotate(cx, cy, x + width, y + height, rotation),
                this._rotate(cx, cy, x + width, y, rotation),
            ]
        }
        
        // needs to be tested
        const points = []
        for (var i = 1; i <= sides; i++) {
            points.push({
                x: x + (width * Math.cos(i * 2 * Math.PI / sides)),
                y: y + (height * Math.sin(i * 2 * Math.PI / sides))
            })
        }
        return points
    }

    _rotate(cx, cy, x, y, angle) {
        const radians = degToRad(angle),
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            
        return { cx, cy, x: nx, y: ny };
    }
}