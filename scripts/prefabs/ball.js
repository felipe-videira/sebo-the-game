class Ball extends GameObject {

    constructor ({ 
        color =  "#0095DD", 
        radius = 10, 
        speed = 2 
    } = {}) {
        super("Ball"); 

        this.addComponents([
            new Circle(this, { color, radius }),
            new CircleCollision(this, { radius, collide: false }),
            new RigidBody(this),
            new Bounce(this, { speed })
        ]);
    }

    start () {
        super.start();

        this.getComponent('Rigidbody')
            .setPosition(Canvas.dimensions.width / 2, Canvas.dimensions.height - 30);
    }
}
 