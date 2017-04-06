const Round = require("./Round")

function RockPaperScissors(){
    this.playRound = function(player1Throw, player2Throw, ui, roundRepo){
        new PlayUseCase(player1Throw, player2Throw, ui, roundRepo).execute()
    }

    this.history = function(ui, roundRepo){
        if (roundRepo.isEmpty()){
            ui.noHistory()
        } else {
            ui.history(roundRepo.getAll())
        }
    }
}

function PlayUseCase(player1Throw, player2Throw, ui, roundRepo){
    this.execute = function(){
        if (inputInvalid()){
            handleInvalid()
        } else if (tie() ){
            handleTie()
        } else if (p1Wins()){
            handleWinner("p1")
        } else {
            handleWinner("p2")
        }
    }

    const validInput = ["rock", "paper", "scissors"]

    function invalid(playerThrow) {
        return !validInput.includes(playerThrow)
    }

    function inputInvalid() {
        return invalid(player1Throw) || invalid(player2Throw)
    }

    function tie() {
        return player1Throw === player2Throw
    }

    function p1Wins() {
        return player1Throw === "paper" && player2Throw === "rock" ||
            player1Throw === "rock" && player2Throw === "scissors" ||
            player1Throw === "scissors" && player2Throw === "paper"
    }

    function handleInvalid() {
        roundRepo.save(new Round(player1Throw, player2Throw, "invalid"))
        ui.invalid()
    }

    function handleTie() {
        roundRepo.save(new Round(player1Throw, player2Throw, "tie"))
        ui.tie()
    }

    function handleWinner(winner) {
        roundRepo.save(new Round(player1Throw, player2Throw, winner))
        ui.winner(winner)
    }
}

module.exports = {
    RockPaperScissors
}