import React from 'react';

export default (props) => {
  return (
    <div>
        {/* //use the map method to loop through all the dots */}
      {props.snakeDots.map((dot, i) => {
        const style = {
            // render each dot and set the x and y coordinates
            //X-axis
          left: `${dot[0]}%`,
            //y-axis
          top: `${dot[1]}%`
        }
        return (
          <div className="snake-dot" key={i} style={style}></div>
        )
      })}
    </div>
  )
}