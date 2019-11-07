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
        });

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
        });
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
    static abSatCollision (
        { 
            aX,  aY,  aRotation, aWidth = null,  aHeight = null,  aSides = null, 
            aRadius = null, aIsRect = false, bX,  bY, bRotation,  bWidth = null, 
            bHeight = null, bSides = null, bRadius = null, bIsRect = false,
        } = {}, 
        drawCollider = false, 
    ) {
        const aAxis = this.instance._getAxis(aX, aY, aRotation, aWidth, aHeight, aIsRect, aRadius, aSides);
        const bAxis = this.instance._getAxis(bX, bY, bRotation, bWidth, bHeight, bIsRect, bRadius, bSides);
        for (let i = 0; i < aAxis.length; i++) {
            const aa = aAxis[i];
            const ab = aAxis[i ? i - 1 : aAxis.length - 1];
            if (drawCollider) Canvas.createLine({ fromX: aa.x, fromY: aa.y, toX: ab.x, toY: ab.y, color: 'green' });
            for (let j = 0; j < bAxis.length; j++) {
                const ba = bAxis[j];
                const bb = bAxis[j ? j - 1 : bAxis.length - 1];
                if (this.lineCollision(aa.x, aa.y, ab.x, ab.y, ba.x, ba.y, bb.x, bb.y)) {
                    return true;
                }
            }
        }
        return false
    }

    static canvasBoxCollision (coll, collide = true) {
        let collided = true;
        if (coll.x + coll.xunit > Canvas.dimensions.width) {
            if (collide) coll.user.transform.x = Canvas.dimensions.width - coll.xunit;
            collided = true;
        }
        if (coll.x < 0) {
            if (collide) coll.user.transform.x = 0;
            collided = true;
        }
        if (coll.y + coll.yunit > Canvas.dimensions.height) {
            if (collide) coll.user.transform.y = Canvas.dimensions.height - coll.yunit;
            collided = true;
        }
        if (coll.y < 0) {
            if (collide) coll.user.transform.y = 0;
            collided = true;
        }
        return collided;
    }

    // only work with rects, for now
    static canvasSatCollision ({ x, y, rotation, xunit, yunit }) {
        for (const axis of this.instance._getAxis(x, y, rotation, xunit, yunit, true)) {
            if (axis.x > Canvas.dimensions.width) 
                return { axis, pos: { x: axis.x - Canvas.dimensions.width, y: axis.y }}
            if (axis.x < 0) 
                return { axis, pos: { x: 0, y: axis.y }}
            if (axis.y > Canvas.dimensions.height) 
                return { axis, pos: { x: axis.x, y: axis.y - Canvas.dimensions.height }}
            if (axis.y < 0)  
                return { axis, pos: { x: axis.x, y: 0 }}
        }
        return;
    }

    static abPushAway (a, b) {
        if (!a.isCollider || !b.isCollider) {
            throw Error("Something here is not a Collider!");
        }

        const m = magnitude(a.rigidbody.velocity.x, a.rigidbody.velocity.y);
        const { x, y } = normalize(a.x - b.x, a.y - b.y);
        a.rigidbody.addForce(x * m, y * m);
        b.rigidbody.addForce(x * -m, y * -m);
    }

    static pushAway (pa, pb, go) {
        if (!go.rigidbody || 
            !pa.hasOwnProperty('x') || 
            !pa.hasOwnProperty('y') || 
            !pb.hasOwnProperty('x') || 
            !pb.hasOwnProperty('y')) {
            throw Error("Invalid parameters!");
        }   
        const m = magnitude(go.rigidbody.velocity.x, go.rigidbody.velocity.y);
        const { x, y } = normalize(pa.x - pb.x, pa.y - pb.y);
        go.rigidbody.addForce(x * -m, y * -m);
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
        width = null,
        height = null,
        rect = false,
        radius = null,
        sides = null
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