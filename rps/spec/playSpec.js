const { RockPaperScissors } = require("../src/rockPaperScissors")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("playRound", function () {
    let rockPaperScissors, ui, roundRepo

    beforeEach(function () {
        rockPaperScissors = new RockPaperScissors()
        roundRepo = new FakeRoundRepo()
    })

    describe("win scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["winner"])
        })

        it("rock v. paper", function () {
            rockPaperScissors.playRound("rock", "paper", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("paper v. rock", function () {
            rockPaperScissors.playRound("paper", "rock", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("scissors v. rock", function () {
            rockPaperScissors.playRound("scissors", "rock", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("rock v. scissors", function () {
            rockPaperScissors.playRound("rock", "scissors", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("paper v. scissors", function () {
            rockPaperScissors.playRound("paper", "scissors", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("scissors v. paper", function () {
            rockPaperScissors.playRound("scissors", "paper", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })
    })


    describe("ties", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            rockPaperScissors.playRound("rock", "rock", ui, roundRepo)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rockPaperScissors.playRound("paper", "paper", ui, roundRepo)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rockPaperScissors.playRound("scissors", "scissors", ui, roundRepo)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("rock v. sailboat", function () {
            rockPaperScissors.playRound("rock", "sailboat", ui, roundRepo)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("sailboat v. sailboat", function () {
            rockPaperScissors.playRound("sailboat", "sailboat", ui, roundRepo)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })



})