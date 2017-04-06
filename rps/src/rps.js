const Round = require("./Round")

function RPS(){
    this.play = function(p1, p2, ui, roundRepo){
        new PlayUseCase(p1, p2, ui, roundRepo).execute()
    }

    this.history = function(ui, roundRepo){
        if (roundRepo.isEmpty()){
            ui.noHistory()
        } else {
            ui.history(roundRepo.getAll())
        }
    }
}

function PlayUseCase(p1, p2, ui, roundRepo){
    this.execute = function(){
        if (inputInvalid()){
            ui.invalid()
        } else if (tie() ){
            ui.tie()
        } else if (p1Wins()){
            ui.winner("p1")
        } else {
            roundRepo.save(new Round(p1, p2, "p2"))
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