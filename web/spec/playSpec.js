const React = require("react")
const ReactDOM = require("react-dom")

const { Round } = require("rps")

const RpsUI = require("../RpsUI")

describe("playRound", function () {
    describe("invalid input", function () {
        beforeEach(function () {
            renderApp({
                playRound: function(p1, p2, ui){
                    ui.invalid()
                }
            })
        })

        it("displays INVALID to the user", function () {
            submitPlayForm()

            expect(page()).toContain("INVALID")
        })
    })

    describe("tie", function () {
        beforeEach(function () {
            renderApp({
                playRound: function(p1, p2, ui){
                    ui.tie()
                }
            })
        })

        it("displays TIE to the user", function () {
            submitPlayForm()

            expect(page()).toContain("TIE")
        })
    })

    describe("p1 wins", function () {
        beforeEach(function () {
            renderApp({
                playRound: function(p1, p2, ui){
                    ui.winner("p1")
                }
            })
        })

        it("displays P1 WINS to the user", function () {
            submitPlayForm()

            expect(page()).toContain("P1 WINS")
        })
    })

    describe("p2 wins", function () {
        beforeEach(function () {
            renderApp({
                playRound: function(p1, p2, ui){
                    ui.winner("p2")
                }
            })
        })

        it("displays P2 WINS to the user", function () {
            submitPlayForm()

            expect(page()).toContain("P2 WINS")
        })
    })

    it("sends user input to the playRound use case", function () {
        const playRoundSpy = jasmine.createSpy("playRound")
        const historySpy = jasmine.createSpy("history")

        renderApp({
            playRound: playRoundSpy,
            history: historySpy
        })

        expect(historySpy).toHaveBeenCalled()
        historySpy.calls.reset()

        let p1Throw = "p1 throw value"
        let p2Throw = "p2 throw value"

        input("#p1Throw", p1Throw)
        input("#p2Throw", p2Throw)

        submitPlayForm()

        expect(playRoundSpy).toHaveBeenCalledWith(p1Throw,  p2Throw, jasmine.any(Object), jasmine.any(Object))
        expect(historySpy).toHaveBeenCalled()

    })

    describe("when there is no history", function () {
        beforeEach(function () {
            renderApp({
                history: function(ui){
                    ui.noHistory()
                }
            })
        });

        it("tells the user there is no history", function () {
            expect(page()).toContain("NO HISTORY")
        });

    });

    describe("when there is history", function () {
        beforeEach(function () {
            renderApp({
                history: function(ui){
                    ui.history([
                        new Round("foo", "bar", "baz")
                    ])
                }
            })
        })

        it("displays the history", function () {
            expect(page()).toContain("foo")
            expect(page()).toContain("bar")
            expect(page()).toContain("baz")
        })
    });

    let domFixture


    function input(inputSelector, inputValue) {
        let domInput = document.querySelector(inputSelector);
        domInput.value = inputValue
        domInput.dispatchEvent(new Event("input", {bubbles: true, cancelable: false}))
    }

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "rpsApp"
        document.querySelector("body").appendChild(domFixture)
    }

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        domFixture.remove()
    })

    function renderApp(rps) {
        rps.history = rps.history || function() {}

        let repoSpy = jasmine.createSpyObj("repo", ["save", "getAll", "isEmpty"]);

        ReactDOM.render(
            <RpsUI rps={rps} roundRepo={repoSpy}/>,
            domFixture
        )
    }

    function submitPlayForm() {
        document.querySelector("#playButton").click()
    }

    function page() {
        return domFixture.innerText
    }
})