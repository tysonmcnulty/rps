const React = require('react')

const RpsUI = React.createClass({
    getInitialState(){
        return {
            message: null,

            history: null
        }
    },

    submitForm(){
        this.props.rps.playRound(this.state.p1Throw, this.state.p2Throw, this, this.props.roundRepo)
        this.props.rps.history(this, this.props.roundRepo)
    },

    invalid(){
        this.setState({message: "INVALID"})
    },

    noHistory(){
        this.setState({history: "NO HISTORY"})
    },

    history(rounds){
        this.setState({
            history: rounds.map(round => {
                return `${round.p1Throw}, ${round.p2Throw}, ${round.outcome}`
            })
        })
    },

    tie(){
        this.setState({message: "TIE"})
    },

    winner(player){
        this.setState({message: `${player.toUpperCase()} WINS`})
    },

    p1ThrowChangeHandler(e){
        this.setState({p1Throw: e.target.value})
    },

    p2ThrowChangeHandler(e){
        this.setState({p2Throw: e.target.value})
    },

    componentDidMount(){
        this.props.rps.history(this, this.props.roundRepo)
    },

    render(){
        return (
            <div>
                {this.state.message}
                <input type="text" id="p1Throw" onChange={this.p1ThrowChangeHandler}/>
                <input type="text" id="p2Throw" onChange={this.p2ThrowChangeHandler}/>
                <button id="playButton" onClick={this.submitForm}>Play</button>
                <div>{this.state.history}</div>
            </div>
        )
    }
})

module.exports = RpsUI