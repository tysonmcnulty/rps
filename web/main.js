const React = require('react')
const ReactDOM = require('react-dom')

const { RockPaperScissors } = require('rps')

const RpsUI = require('./RpsUI')

function FakeRoundRepo(){
    let rounds = []

    this.save = function(round){
        rounds.push(round)
    }

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.getAll = function(){
        return rounds
    }
}

ReactDOM.render(
    <RpsUI rps={new RockPaperScissors()} roundRepo={new FakeRoundRepo()} />,
    document.getElementById("RpsApp")
)
