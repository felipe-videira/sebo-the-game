class GameManager extends MonoBehaviour {
    
    get name () {
        return "GameManager";
    }

    start () {
        EventEmitter.on(EVENT.BALL_BEYOND_LIMITS, () => this.gameOver());
    }

    gameOver () {
        alert("GAME OVER");
        
        document.location.reload();
        
        gameOver();
    }
}