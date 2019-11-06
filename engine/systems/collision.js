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
        { aX,  aY,  aWidth,  aHeight,  bX,  bY,  bWidth,  bHeight } = {}, 
        drawCollider = false, 
    ) {
        if (drawCollider) Canvas.createBox({ 
            x: aX,
            y: aY,
            width: aWidth,
            height: aHeight,
            color: 'transparent', 
            borderColor: 'green' 
        })
        return aX <= bX + bWidth &&
            aX + aWidth >= bX &&
            aY <= bY + bHeight &&
            aY + aHeight >= bY;
    }
    
    static circleCollision (
        { aX,  aY,  aRadius,  bX,  bY,  bRadius } = {}, 
        drawCollider = false, 
    ) {
       if (drawCollider) Canvas.createCircle({ 
            x: aX,
            y: aY,
            radius: aRadius,
            color: 'transparent', 
            borderColor: 'green'
        })
        return Math.sqrt(((aX - bX) * (aX - bX)) + ((aY - bY) * (aY - bY))) < (aRadius + bRadius);
    };
    
    static lineCollision (ax, ay, bx, by, cx, cy, dx, dy) {
        let det, gamma, lambda;
        det = (bx - ax) * (dy - cy) - (dx - cx) * (by - ay);
        if (det === 0) {
            return false;
        } else {
            lambda = ((dy - cy) * (dx - ax) + (cx - dx) * (dy - ay)) / det;
            gamma = ((ay - by) * (dx - ax) + (bx - ax) * (dy - ay)) / det;
            return (0 <= lambda && lambda <= 1) && (0 <= gamma && gamma <= 1);
        }
    }

    // needs testing with circles and polygons
    static SATCollision (
        { 
            aX,  aY,  aRotation, aWidth = null,  aHeight = null,  aSides = null, 
            aRadius = null, aIsRect = false, bX,  bY, bRotation,  bWidth = null, 
            bHeight = null, bSides = null, bRadius = null, bIsRect = false,
        } = {}, 
        drawCollider = false, 
    ) {
        const aPoints = this.instance._getAxis(aX, aY, aRotation, aSides, aWidth, aHeight, aRadius, aIsRect);
        const bPoints = this.instance._getAxis(bX, bY, bRotation, bSides, bWidth, bHeight, bRadius, bIsRect);
        for (let i = 0; i < aPoints.length; i++) {
            const aa = aPoints[i];
            const ab = aPoints[i ? i - 1 : aPoints.length - 1];
            if (drawCollider) {
                Canvas.createLine({ fromX: aa.x, fromY: aa.y, toX: ab.x, toY: ab.y, color: 'green' });
            }
            for (let j = 0; j < bPoints.length; j++) {
                const ba = bPoints[j];
                const bb = bPoints[j ? j - 1 : bPoints.length - 1];
                if (this.lineCollision(aa.x, aa.y, ab.x, ab.y, ba.x, ba.y, bb.x, bb.y)) {
                    return true;
                }
            }
        }
        return false
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
        const cos = Math.cos(angle),
            sin = Math.sin(angle),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            
        return { cx, cy, x: nx, y: ny };
    }
}