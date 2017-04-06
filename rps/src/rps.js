function RPS(){
    this.play = function(p1, p2, ui){
        new PlayUseCase(p1, p2, ui).execute()
    }

    this.history = function(){

    }
}

function PlayUseCase(p1, p2, ui){
    this.execute = function(){
        if (inputInvalid()){
            ui.invalid()
        } else if (tie() ){
            ui.tie()
        } else if (p1Wins()){
            ui.winner("p1")
        } else {
            ui.winner("p2")
        }
    }

    const validInput = ["rock", "paper", "scissors"]

    function invalid(playerThrow) {
        return !validInput.includes(playerThrow)
    }

    function inputInvalid() {
        return invalid(p1) || invalid(p2)
    }

    function tie() {
        return p1 === p2
    }

    function p1Wins() {
        return p1 === "paper" && p2 === "rock" ||
            p1 === "rock" && p2 === "scissors" ||
            p1 === "scissors" && p2 === "paper"
    }
}

module.exports = {
    RPS
}