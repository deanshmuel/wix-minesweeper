import React from 'react'

const Row = React.memo(props => {
    return (
        <div 
        className = "board-row">
            {props.squares}
        </div>  
    );
  });
//Row = React.memo(Row);
export default Row;