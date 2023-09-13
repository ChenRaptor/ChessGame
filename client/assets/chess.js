let letters = ['A','B','C','D','E','F','G','H']
let numbers = ['1','2','3','4','5','6','7','8']
let socket = io.connect(':8090')

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


// function startGame ()
// {
//     let grid = [
//         ['T-2-1', 'C-2-1', 'F-2-1', 'D-2', 'R-2', 'F-2-2', 'C-2-2', 'T-2-2'],
//         ['P-2-1', 'P-2-2', 'P-2-3', 'P-2-4', 'P-2-5', 'P-2-6', 'P-2-7', 'P-2-8'],
//         [null, null, null, null, null, null, null, null],
//         [null, null, null, null, null, null, null, null],
//         [null, null, null, null, null, null, null, null],
//         [null, null, null, null, null, null, null, null],
//         ['P-1-1', 'P-1-2', 'P-1-3', 'P-1-4', 'P-1-5', 'P-1-6', 'P-1-7', 'P-1-8'],
//         ['T-1-1', 'C-1-1', 'F-1-1', 'D-1', 'R-1', 'F-1-2', 'C-1-2', 'T-1-2'],
//     ]
//         letters.map( (letter, letterIndex) => 
//         numbers.map( (number, numberIndex) => 
//         {

//             let val = grid[letterIndex][numberIndex];
//             if (val !== null)
//             {
//                 let pion = val.split('-');
//                 $(`#${letter}${number}`).html(`
//                     ${
//                         pion[0] === 'P' ? `<div class="team-${pion[1] === '1' ? 'white' : 'black' }"><img src="modules/chess/img/chess-pawn.svg"/></div>` :
//                         pion[0] === 'T' ? `<div class="team-${pion[1] === '1' ? 'white' : 'black' }"><img src="modules/chess/img/chess-rook.svg"/></div>` :
//                         pion[0] === 'C' ? `<div class="team-${pion[1] === '1' ? 'white' : 'black' }"><img src="modules/chess/img/chess-knight.svg"/></div>` :
//                         pion[0] === 'F' ? `<div class="team-${pion[1] === '1' ? 'white' : 'black' }"><img src="modules/chess/img/chess-bishop.svg"/></div>` :
//                         pion[0] === 'D' ? `<div class="team-${pion[1] === '1' ? 'white' : 'black' }"><img src="modules/chess/img/chess-queen.svg"/></div>` : `<div class="team-${pion[1] === '1' ? 'white' : 'black' }"><img src="modules/chess/img/chess-king.svg"/></div>`
//                     }
//                 `)
//             }

//         }))
// }


// $("#start-chessgame").click(function ()
// {
//     startGame();
// })



$("#start-chessgame").click(function ()
{
    socket.emit('startChessGame');
})


socket.on('startChessGame', ({grid}) => 
{
    console.log(grid)
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