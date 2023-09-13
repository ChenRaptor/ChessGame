let letters = ['A','B','C','D','E','F','G','H']
let numbers = ['1','2','3','4','5','6','7','8']

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

