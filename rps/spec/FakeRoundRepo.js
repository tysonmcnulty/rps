function FakeRoundRepo(){
    let empty = true

    this.save = function(){
        empty = false
    }

    this.isEmpty = function(){
        return empty
    }

    this.getAll = function(){

    }
}

module.exports = FakeRoundRepo