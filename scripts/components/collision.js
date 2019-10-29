class Collision extends Component {

    onCollision = ({ onX, onY } = {}) => {}
    
    get name () {
        return "Collision";
    }

    update () {
        super.update();

        this.detectCollision();
    }

    detectCollision () {
        throw Error("The method detectCollision must be implemented!");
    }

}