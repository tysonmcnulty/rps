const { RockPaperScissors, Round } = require("../src/rockPaperScissors")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    describe("when no rounds have been played", function () {
        it("tells the UI no history", function () {
            const ui = jasmine.createSpyObj("ui", ["noHistory"])

            rockPaperScissors.history(ui, roundRepo)

            expect(ui.noHistory).toHaveBeenCalled()
        })
    })

    describe("when rounds have been played", function () {
        it("sends the rounds to the UI", function () {
            const ui = jasmine.createSpyObj("ui", ["history", "winner", "tie", "invalid"])

            rockPaperScissors.playRound("rock", "paper", ui, roundRepo)
            rockPaperScissors.playRound("paper", "rock", ui, roundRepo)
            rockPaperScissors.playRound("paper", "paper", ui, roundRepo)
            rockPaperScissors.playRound("rock", "sailboat", ui, roundRepo)

            rockPaperScissors.history(ui, roundRepo)

            expect(ui.history).toHaveBeenCalledWith([
                new Round("rock", "paper", "p2"),
                new Round("paper", "rock", "p1"),
                new Round("paper", "paper", "tie"),
                new Round("rock", "sailboat", "invalid"),
            ])
        })

    })

    let rockPaperScissors, roundRepo

    beforeEach(function () {
        roundRepo = new FakeRoundRepo()
        rockPaperScissors = new RockPaperScissors()
    })
})










