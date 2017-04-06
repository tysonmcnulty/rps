const React = require("react")
const ReactDOM = require("react-dom")

const RpsApp = React.createClass({
    getInitialState(){
        return {
            message: null
        }
    },

    submitForm(){
        this.props.rps.play("foo", "bar", this)
    },

    invalid(){
        this.setState({message: "INVALID"})
    },

    render(){
        return (
            <div>
                {this.state.message}
                <button id="playButton" onClick={this.submitForm}>Play</button>
            </div>
        )
    }
})

describe("play", function () {
    describe("invalid input", function () {
        beforeEach(function () {
            renderApp({
                play: function(p1, p2, ui){
                    ui.invalid()
                }
            })
        })

        it("displays INVALID to the user", function () {
            submitPlayForm()

            expect(page()).toContain("INVALID")
        })
    })

    let domFixture

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
        ReactDOM.render(
            <RpsApp rps={rps}/>,
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