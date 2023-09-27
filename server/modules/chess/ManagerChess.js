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
        this.letters = ['A','B','C','D','E','F','G','H']
        this.numbers = ['1','2','3','4','5','6','7','8']
        this.chessboard = [
            ['A1','A2','A3','A4','A5','A6','A7','A8'],
            ['B1','B2','B3','B4','B5','B6','B7','B8'],
            ['C1','C2','C3','C4','C5','C6','C7','C8'],
            ['D1','D2','D3','D4','D5','D6','D7','D8'],
            ['E1','E2','E3','E4','E5','E6','E7','E8'],
            ['F1','F2','F3','F4','F5','F6','F7','F8'],
            ['G1','G2','G3','G4','G5','G6','G7','G8'],
            ['H1','H2','H3','H4','H5','H6','H7','H8']
        ]

        this.placement = 
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
        return this.placement
    }


    indexOf2D(array2D, target) {
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

    findSubarray(arr, subarray) {
        for (let i = 0; i < arr.length; i++) {
          const currentSubarray = arr[i];
          if (this.arraysAreEqual(currentSubarray, subarray)) {
            return i;
          }
        }
        return -1; // Retourne -1 si le tableau n'a pas été trouvé
      }
      
    arraysAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
          return false;
        }
        
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            return false;
          }
        }
        
        return true;
      }



    isValidMove(possibility) {
        return possibility[0] >= 0 && possibility[0] < 8 && possibility[1] >= 0 && possibility[1] < 8;
    }

    validAndExtendPossibilities (possibility) {
        isValidMove(possibility)
        possibilities.push(possibility)
    }


    moveTo(case0, case1)
    {
        const [ligne0, colonne0] = this.indexOf2D(this.chessboard, case0);

        if (this.placement[ligne0][colonne0]) {
            const piece = this.placement[ligne0][colonne0]
            // console.log(piece)
            const matriceMovePiece = piece.matriceMove()

            // console.log(matriceMovePiece)
            let possibilities = []
            let forward = -1;
            let possibility = null;

            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {

                    if (matriceMovePiece[r][c] !== 0) {

                        for (let d = 1; d < matriceMovePiece[r][c] + 1; d++) {
                            if (r === 0) {
                                if (c === 0) {
                                    possibility = [ligne0 + (d*forward), colonne0 - d]
                                    isValidMove(possibility)
                                    possibilities.push(possibility)
                                }
                                else if (c === 1) {
                                    possibility = [ligne0 + (d*forward), colonne0]
                                    isValidMove(possibility)
                                    possibilities.push(possibility)
                                }
                                else {
                                    possibility = [ligne0 + (d*forward), colonne0 + d]
                                    isValidMove(possibility)
                                    possibilities.push(possibility)
                                }
                            }
                            else if (r === 1) {
                                if (c === 0) {
                                    possibilities.push([ligne0, colonne0 - d])
                                }
                                else if (c === 1) {
                                    // possibilities.push([ligne0, colonne0])
                                }
                                else {
                                    possibilities.push([ligne0, colonne0 + d])
                                }
                            }
                            else {
                                if (c === 0) {
                                    possibilities.push([ligne0 - (d*forward), colonne0 - d])
                                }
                                else if (c === 1) {
                                    possibilities.push([ligne0 - (d*forward), colonne0])
                                }
                                else {
                                    possibilities.push([ligne0 - (d*forward), colonne0 + d])
                                }
                            }
                        }
                    }
                }
            }

            const [ligne1, colonne1] = this.indexOf2D(this.chessboard, case1);
            const index = this.findSubarray(possibilities, [ligne1, colonne1]);

            // console.log(possibilities)
            // console.log([ligne1, colonne1])
            // console.log(index)

            if (index !== -1) {
                if (piece.type === 'Pawn') {
                    firstDisplacementCompleted()
                }
                this.placement[ligne0][colonne0] = null
                this.placement[ligne1][colonne1] = piece
            } 
            else {

            }
        }


        return this.placement 
    }




}

module.exports =  {
	ManagerChess: ManagerChess
}




// function findSubarray(arr, subarray) {
//     for (let i = 0; i < arr.length; i++) {
//       const currentSubarray = arr[i];
//       if (arraysAreEqual(currentSubarray, subarray)) {
//         return i;
//       }
//     }
//     return -1; // Retourne -1 si le tableau n'a pas été trouvé
//   }
  
//   function arraysAreEqual(arr1, arr2) {
//     if (arr1.length !== arr2.length) {
//       return false;
//     }
    
//     for (let i = 0; i < arr1.length; i++) {
//       if (arr1[i] !== arr2[i]) {
//         return false;
//       }
//     }
    
//     return true;
//   }
  
//   // Exemple d'utilisation :
//   const tableauPrincipal = [
//     ['A', 'B', 'C'],
//     ['D', 'E', 'F'],
//     ['G', 'H', 'I']
//   ];
  
//   const tableauRecherche = ['D', 'E', 'F'];
  
//   const index = findSubarray(tableauPrincipal, tableauRecherche);
  
//   if (index !== -1) {
//     console.log(`Le tableau a été trouvé à l'indice ${index}.`);
//   } else {
//     console.log("Le tableau n'a pas été trouvé dans le tableau principal.");
//   }
  