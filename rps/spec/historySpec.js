const { RPS } = require("../src/rps")
const Round = require("../src/Round")

describe("history", function () {
    describe("when no rounds have been played", function () {
        it("tells the UI no history", function () {
            const ui = jasmine.createSpyObj("ui", ["noHistory"])

            const rps = new RPS()

            rps.history(ui)

            expect(ui.noHistory).toHaveBeenCalled()
        })
    })

    fdescribe("when rounds have been played", function () {
        it("sends the rounds to the UI", function () {
            const ui = jasmine.createSpyObj("ui", ["history", "winner"])

            const rps = new RPS()

            const roundRepo = new FakeRoundRepo()

            rps.play("rock", "paper", ui, roundRepo)

            rps.history(ui, roundRepo)

            expect(ui.history).toHaveBeenCalledWith([
                new Round("rock", "paper", "p2")
            ])
        })

    })
})

function FakeRoundRepo(){
    this.save = function(){

    }

    this.isEmpty = function(){

    }

    this.getAll = function(){

    }
}









