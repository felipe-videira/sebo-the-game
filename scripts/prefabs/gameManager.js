class GameManager extends MonoBehaviour {
    
    start () {
        EventEmmiter.on(EVENT.BALL_BEYOND_LIMITS, () => this.gameOver())
    }

    gameOver () {
        alert("GAME OVER");
        
        document.location.reload();
        
        gameOver();
    }
}