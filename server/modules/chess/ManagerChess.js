var {Bishop} = require('./assets/Bishop.js');
var {King} = require('./assets/King.js');
var {Knight} = require('./assets/Knight.js');
var {Pawn} = require('./assets/Pawn.js');
var {Queen} = require('./assets/Queen.js');
var {Rook} = require('./assets/Rook.js');

class ManagerChess
{ 
    constructor() 
    {
        // this.socket = io.connect(':8090')
        this.setupPlacement = 
        [
            [new Rook(2,1), new Knight(2,1), new Bishop(2,1), new Queen(2,1), new King(2,1), new Bishop(2,2), new Knight(2,2), new Rook(2,2)],
            [new Pawn(2,1), new Pawn(2,2), new Pawn(2,3), new Pawn(2,4), new Pawn(2,5), new Pawn(2,6), new Pawn(2,7), new Pawn(2,8)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn(1,1), new Pawn(1,2), new Pawn(1,3), new Pawn(1,4), new Pawn(1,5), new Pawn(1,6), new Pawn(1,7), new Pawn(1,8)],
            [new Rook(1,1), new Knight(1,1), new Bishop(1,1), new Queen(1,1), new King(1,1), new Bishop(1,2), new Knight(1,2), new Rook(1,2)],
        ]
    }

    setupGame()
    {
        return this.setupPlacement
    }




}

module.exports =  {
	ManagerChess: ManagerChess
}
