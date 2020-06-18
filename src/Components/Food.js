import React from 'react';

export default (props) => {
// define the coordinates of the food with left and right (X and Y axis)
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  }

  return (
    <div className="snake-food" style={style}></div>
  )
}