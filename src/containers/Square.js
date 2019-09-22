import React from 'react'

const Square = React.memo(props => {
    return (
      <div 
          className= {["square", props.clicked].join(" ")}
          onClick = {props.onClick} >
          <div className="square-container" >
            {props.isSuperman && <div className="superman-cell">{props.supermanValue}</div>}
              <div className ="square-cell">
                  {props.value}
              </div>  
          </div>
      </div>      
    );
  });
//Square = React.memo(Square);
export default Square;