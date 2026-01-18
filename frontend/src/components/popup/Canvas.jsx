import React from 'react'

import './Canvas.css'

function Canvas({pos, popDelay, onClose}) {
  return (
    <div className='Canvas' style={{ top: pos.top, left: pos.left, animationDelay: popDelay+"ms" }}> 
      <div className='OuterBox'>
        <button className='close' onClick={onClose}>x</button>
        <div className='InnerBox'>
            <div className='Blank'></div>
        </div>
      </div>
    </div>
  )
}

export default Canvas
