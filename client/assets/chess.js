let letters = ['A','B','C','D','E','F','G','H']
let numbers = ['1','2','3','4','5','6','7','8']
let socket = io.connect(':8090')

let placement = []
let chessboard = [
    ['A1','A2','A3','A4','A5','A6','A7','A8'],
    ['B1','B2','B3','B4','B5','B6','B7','B8'],
    ['C1','C2','C3','C4','C5','C6','C7','C8'],
    ['D1','D2','D3','D4','D5','D6','D7','D8'],
    ['E1','E2','E3','E4','E5','E6','E7','E8'],
    ['F1','F2','F3','F4','F5','F6','F7','F8'],
    ['G1','G2','G3','G4','G5','G6','G7','G8'],
    ['H1','H2','H3','H4','H5','H6','H7','H8']
]

function indexOf2D(array2D, target) {
    for (let i = 0; i < array2D.length; i++) {
      const row = array2D[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === target) {
          return [i, j];
        }
      }
    }
    return null;
}



$("#chessboard-grid").append(`
    ${letters.map( (letter,letterIndex) => numbers.map( (number,numberIndex) => {

            let val1 = letterIndex%2;
            let val2 = numberIndex%2;

            let colorClass = 
            val1 === 0 && val2 === 0 ? 'case-black' :
            val1 === 1 && val2 === 0 ? 'case-white' :
            val1 === 0 && val2 === 1 ? 'case-white' : 'case-black';

            return `<div id="${letter}${number}" class="${colorClass}" d><span>${letter}${number}</span></div>` }).join('')
        
    ).join('')}
`)



$("#start-chessgame").click(function ()
{
    socket.emit('startChessGame');
})


socket.on('startChessGame', ({grid}) => 
{
    placement = grid
    letters.map( (letter, letterIndex) => 
    numbers.map( (number, numberIndex) => 
    {

        let val = grid[letterIndex][numberIndex];
        if (val !== null)
        {
            console.log(val)
            $(`#${letter}${number}`).html(`
                ${
                    val.type === 'Pawn' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-pawn.svg"/></div>` :
                    val.type === 'Rook' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-rook.svg"/></div>` :
                    val.type === 'Knight' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-knight.svg"/></div>` :
                    val.type === 'Bishop' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-bishop.svg"/></div>` :
                    val.type === 'Queen' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-queen.svg"/></div>` : 
                    `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-king.svg"/></div>`
                }
            `)
        }

    }))
})

let pieceMove = [null, null]

$('#chessboard-grid > div').click(function (event)
{
    
    console.log(event.currentTarget.id)


    const [ligne, colonne] = indexOf2D(chessboard, event.currentTarget.id)
    let caseValue = placement[ligne][colonne]
    if (caseValue !== null) {
        pieceMove[0] = event.currentTarget.id
    }
    else if (pieceMove[0]) {
        pieceMove[1] = event.currentTarget.id
        socket.emit("pieceMove", {
            case0: pieceMove[0],
            case1: pieceMove[1]
        });
        pieceMove = [null, null];
    }
    else {
        pieceMove = [null, null];
    }



    // if (event.currentTarget.innerHTML === '') {
    //     pieceMove[1] = event.currentTarget.id
    //     socket.emit("pieceMove", {
    //         case0: pieceMove[0],
    //         case1: pieceMove[1]
    //     });
    // }
    // else {
    //     pieceMove = [null, null];
    //     pieceMove[0] = event.currentTarget.id
    // }



    // if (pieceMove[0] && pieceMove[1]) {
    //     pieceMove = [null, null];
    //     pieceMove[0] = event.currentTarget.id
    // }
    // else if (pieceMove[0]) {
    //     pieceMove[1] = event.currentTarget.id
    //     socket.emit("pieceMove", {
    //         case0: pieceMove[0],
    //         case1: pieceMove[1]
    //     });
    // }
    // else {
    //     pieceMove[0] = event.currentTarget.id
    // }

    console.log(pieceMove)
})

socket.on('pieceMove', ({grid}) => 
{
    console.log(grid)
    placement = grid


    $('#chessboard-grid > div').html(``)


    letters.map( (letter, letterIndex) => 
    numbers.map( (number, numberIndex) => 
    {

        let val = grid[letterIndex][numberIndex];
        if (val !== null)
        {
            // console.log(val)
            $(`#${letter}${number}`).html(`
                ${
                    val.type === 'Pawn' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-pawn.svg"/></div>` :
                    val.type === 'Rook' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-rook.svg"/></div>` :
                    val.type === 'Knight' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-knight.svg"/></div>` :
                    val.type === 'Bishop' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-bishop.svg"/></div>` :
                    val.type === 'Queen' ? `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-queen.svg"/></div>` : 
                    `<div class="team-${val.team === 1 ? 'white' : 'black' }"><img src="modules/chess/img/chess-king.svg"/></div>`
                }
            `)
        }

    }))
})