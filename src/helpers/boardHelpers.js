export const createInitialBoard = (height, width, mines) => {
    let board = createEmptyBoard(height, width);
    board = plantMines(board, mines);
    board = countBoardValues(board);
    return board;
}
export const createValuesBoard = (board) => {
    let valueBoard = [];
    for(let i=0; i<board.length; i++){
        let row = [];
        for(let j=0; j<board[0].length; j++){
            row.push(actualValue(board,i,j));
        }
        valueBoard.push(row);
    }
    return valueBoard;
}
export const createDisplayBoard = (board) => {
    let displayBoard = [];
    for(let i=0; i<board.length; i++){
        let row = [];
        for(let j=0; j<board[0].length; j++){
            row.push("");
        }
        displayBoard.push(row);
    }
    return displayBoard;
}
const actualValue = (board,i,j) => {
    if(board[i][j].mine){
        return "\uD83D\uDCA3";
    } else {
        return board[i][j].adjacentMines > 0 ? board[i][j].adjacentMines : "";
    }
}
const createEmptyBoard = (height, width) => {
    let map = [];
    for(let i =0; i < height; i++) {
        let row = [];
        for(let j=0; j< width; j++){
            row.push({
                x: i,
                y: j,
                mine: false,
                flagged: false,
                clicked: false,
                adjacentMines: 0,
            });
        }
        map.push(row);
    }
    return map;
}
const randomUpTo = (limit) => {
    return Math.floor(Math.random() * limit);
}
const plantMines = (board, mines) => {
    let plantedMines = 0;
    let rows = board.length;
    let columns = board[0].length;
    let randomX, randomY;
    while(plantedMines < mines){
        randomX = randomUpTo(columns);
        randomY = randomUpTo(rows);
        if(!board[randomY][randomX].mine) {
            board[randomY][randomX].mine = true;
            plantedMines ++;
        }
    }
    //console.log(board);
    return board;
}

const validIndex = (row,column,maxRows,maxColumns) => {
    return row >= 0 &&
           row < maxRows &&
           column >= 0 &&
           column < maxColumns;
}

export const getNeighbors = (i, j, maxRows, maxColumns) => {
    let neighbors = [];
    for (let row = i-1;row < i+2; row++){
        for(let column = j-1 ; column < j+2; column++){
            if(validIndex(row,column,maxRows,maxColumns)){
                neighbors.push({
                    row:row,
                    column: column,
                })
            }
        }
    }
    return neighbors;
}

const addOneToMineCount = (board, i, j, maxRows, maxColumns) => {
    let neighbors = getNeighbors(i, j, maxRows, maxColumns);
    neighbors.map(coord => {
        if(!board[coord.row][coord.column].mine){
            return board[coord.row][coord.column].adjacentMines ++;
        }
        return board[coord.row][coord.column].adjacentMines
    })
    return board;
}

const countBoardValues = (board) => {
    let rows = board.length;
    let columns = board[0].length;
    for(let i =0; i< rows; i++) {
        for(let j =0; j< columns; j++) {
            if(board[i][j].mine){
                board = addOneToMineCount(board,i,j, rows,columns);
            }
        }
    }   
    return board; 
}