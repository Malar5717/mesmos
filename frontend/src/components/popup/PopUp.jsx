import React from 'react'
import './PopUp.css' 

function PopUp({pop, pos, popDelay, onClose}) {
  const align = (pop.buttonText === "cancel") ? "end" : "center"
  return (
    <div className='PopUp'>
      <div className='OuterBox' style={{ top: pos.top, left: pos.left, width: pop.width+"px", animationDelay: popDelay+"ms" }}>
          <button className='close' onClick={onClose}>x</button>
          <div className='InnerBox'>
              <p className='message'>{pop.message}</p>
              <button style={{alignSelf: align}}>{pop.buttonText}</button>
          </div> 
      </div>
    </div>
  ) 
} 

export default PopUp
