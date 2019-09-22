import React from 'react'
import Square from './Square'
import Row from './Row'
import {createInitialBoard, getNeighbors,createValuesBoard,createDisplayBoard} from '../helpers/boardHelpers'

class Board extends React.Component {
    constructor(props) {
        super(props);
        const {height, width, mines} = this.props;
        const board = createInitialBoard(height, width, mines);
        const valuesBoard = createValuesBoard(board);
        const displayBoard = createDisplayBoard(board);
        this.state = {
            board : board,
            valuesBoard : valuesBoard,
            displayBoard: displayBoard,
            flagCount: mines,
            active: true,
            isSuperman: false,
        }
        this.handleSupermanChange = this.handleSupermanChange.bind(this);
        //this.recursive(board,displayBoard,valuesBoard,1);
    }

    handleSupermanChange(e) {
        this.setState({
            isSuperman: e.target.checked,
        })
    }
    
    checkIfGameOver() {
        return !this.state.board.flat().some((cell) => {
            return !cell.flagged && cell.mine;
        })

    }
    handleShiftClick(newBoard,newDisplayBoard,x,y) {
        if(!newBoard[x][y].clicked)
        {
            let newFlagCount = this.state.flagCount;
            if(!newBoard[x][y].flagged){
                if(newFlagCount > 0) {
                    newBoard[x][y].flagged = true;
                    newFlagCount --;
                    newDisplayBoard[x][y] = "\u2691" ;
                } else {
                    alert("You run out of flags...");
                }
            } else {
                newBoard[x][y].flagged = false;
                newFlagCount ++;
                newDisplayBoard[x][y] = "" ;
            }
            this.setState({
                board: newBoard,
                flagCount: newFlagCount,
                displayBoard: newDisplayBoard,
            })
        }
        

    }
    recursiveReveal(board,x,y) {
        if(!board[x][y].clicked && !board[x][y].flagged){
            if(board[x][y].adjacentMines >0) {
                board[x][y].clicked = true;
            } else {
                let maxRows = board.length;
                let maxColumns = board[0].length;
                let neighbors = getNeighbors(x, y, maxRows, maxColumns);
                board[x][y].clicked = true;
                neighbors.forEach((coord) => {
                    board = this.recursiveReveal(board,coord.row,coord.column);
                });
            }
        }
        return board;
    }
    handleRegularClick(newBoard,x,y){
        if(this.state.board[x][y].mine && !this.state.board[x][y].flagged){
            alert('Game over -you lose');
            this.setState({
                active: false,
                displayBoard: this.state.valuesBoard,
            })
        }
        else {
            newBoard =  this.recursiveReveal(newBoard,x,y);
            this.setState({
                board: newBoard,
            })
        }
    }
    handleClick(e,x,y) {
        if(!this.state.active) {
            return;
        }
        let newBoard = this.state.board.map((row)=> row.slice());
        let newDisplayBoard = this.state.displayBoard.map((row)=> row.slice());
        if(e.shiftKey) {
            this.handleShiftClick(newBoard,newDisplayBoard,x,y)
        } else {
            this.handleRegularClick(newBoard,x,y)
        }
        if(this.checkIfGameOver()) {
            alert("you win!");
            this.setState({
                active: false,
                displayBoard: this.state.valuesBoard,
            });
        };
    }
    renderSquare(squareData) {
      return (
        <Square 
            key = {''+ squareData.x + '_' + squareData.y}
            clicked = {this.state.board[squareData.x][squareData.y].clicked? "clicked" : "" }
            isSuperman = {this.state.isSuperman}
            supermanValue = {this.state.valuesBoard[squareData.x][squareData.y]}
            value={this.state.board[squareData.x][squareData.y].clicked?
                this.state.valuesBoard[squareData.x][squareData.y]
                 :this.state.displayBoard[squareData.x][squareData.y]}
            onClick = {(e)=> {
                this.handleClick(e,squareData.x,squareData.y)
            }}
        />
      );
    }
  
makeClass = ()=>{
    // return 'table-container left'
    //get dimension of the screen and calculate whether align left or center
    return "table-container"}

    render() {
        return (
            <>
                <div>
                <form>
                    <label>
                    Superman Mode:
                    <input
                        name="superman"
                        type="checkbox"
                        checked={this.state.isSuperman}
                        onChange={this.handleSupermanChange} />
                    </label>
                </form>
                <h2>flags left: {this.state.flagCount}</h2>
                </div>
                <div className={this.makeClass()} style={{maxWidth:'100px'}}> 
                        {this.state.board.map((rowVals,rowCount) => {
                            return (
                                <Row 
                                key = {'row_' + rowCount}
                                squares = {rowVals.map((columnVal) => {
                                    return (
                                        this.renderSquare(columnVal)
                                    );
                                    
                                })} />

                            );

                        })}
                </div>
            </>
        )
    }
  }

  export default Board;