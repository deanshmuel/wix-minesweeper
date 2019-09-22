import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/index.css'
import Board from './Board'


class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            height: props.height,
            width: props.width,
            mines: props.mines,
            lastGame: new Date(),
        }
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleMinesChange = this.handleMinesChange.bind(this);   
        this.handleSubmit = this.handleSubmit.bind(this); 
    }
    handleHeightChange(e) {
        this.setState({height:e.target.value});
    }
    handleWidthChange(e) {
        this.setState({width: e.target.value});
    }
    handleMinesChange(e) {
        this.setState({mines:e.target.value});
    }
    validInputs() {
        if(this.state.height < 1 || this.state.height > 300) {
            alert("Height should be between 1-300");
            return false;
        } else if (this.state.width < 1 || this.state.width > 300) {
            alert("Width should be between 1-300");
            return false;
        } else if (this.state.mines<0 || 
                    this.state.mines > (this.state.height * this.state.hidth)) {
                        alert("mines should be between 0 to number of cells");
                        return false;
                    }
        return true;
    }
    handleSubmit(e) {
        e.preventDefault();
        if(!this.validInputs()){
            return;
        }
        this.setState({
            lastGame: new Date(),
        })
        //this.render()
    }
    
    render() { 
      return (
        <div className="game">
            <h1>Mine-Sweeper</h1>
            <form className="game-form" onSubmit={this.handleSubmit}>
                <label>
                Height: 
                <input type="text" value={this.state.height} onChange={this.handleHeightChange} />
                </label>
                <label>
                Width:
                <input type="text" value={this.state.width} onChange={this.handleWidthChange} />
                </label>
                <label>
                Mines:
                <input type="text" value={this.state.mines} onChange={this.handleMinesChange} />
                </label>
                <input type="submit" value="New Game" />
            </form>
          <div className="game-board">
            <Board 
                key = {''+this.state.lastGame}
                height = {this.state.height}
                width = {this.state.width}
                mines = {this.state.mines}
            />
          </div>    
        </div>
      );
    }
  }

  export default App;