const FakeRoundRepo = require("./FakeRoundRepo")
const Round = require("../src/Round")

fdescribe("round repo", function () {
    describe("empty", function () {
        describe("when no rounds have been saved", function () {
            it("is empty", function () {
                const repo = new FakeRoundRepo()

                expect(repo.isEmpty()).toBe(true)
            })
        })

        describe("when rounds have been saved", function () {
            it("is not empty", function () {
                const repo = new FakeRoundRepo()

                repo.save(new Round())

                expect(repo.isEmpty()).toBe(false)
            })
        })
    })
})