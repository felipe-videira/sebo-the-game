class MainScene extends Scene {
    
    constructor () {
        super();
        
        this.addMonoBehaviours([
            new Ball(),
            new Paddle(),
            new GameObject("Ball", ref => [
                new Circle(ref, { color: "red", radius: 10 }),
                new CircleCollision(ref, { radius: 10, collide: false }),
                new RigidBody(ref),
                new Bounce(ref, { speed: 2 })
            ])
        ])
    }
    
    get name () {
        return "MainScene";
    }
}