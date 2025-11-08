import React from 'react'

import './Canvas.css'

function Canvas() {
  return (
    <div className='Canvas'>
      <div className='OuterBox'>
        <button>x</button>
        <div className='InnerBox'>
            <div className='Blank'></div>
        </div>
      </div>
    </div>
  )
}

export default Canvas
