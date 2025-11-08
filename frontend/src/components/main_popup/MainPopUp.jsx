import React from 'react'
import './MainPopUp.css' 

function MainPopUp() {
  return (
    <div className='MainPopUp'>
      <div className='OuterBox'>
          <p>x</p>
          <div className='InnerBox'>
              <div className='Text'>
                <h2>MESMOS</h2>
                <p>ready to enter the cosmos of memories?</p>
              </div>
              <div className='controls'>
                <button>Ok</button>
                <button>Cancel</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default MainPopUp
