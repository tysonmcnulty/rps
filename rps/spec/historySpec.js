const { RPS } = require("../src/rps")

describe("history", function () {
    describe("when no rounds have been played", function () {
        it("tells the UI no history", function () {
            const ui = jasmine.createSpyObj("ui", ["noHistory"])

            const rps = new RPS()

            rps.history(ui)

            expect(ui.noHistory).toHaveBeenCalled()
        })
    })
})