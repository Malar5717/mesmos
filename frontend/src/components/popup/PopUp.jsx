import React from 'react'
import './PopUp.css' 

function PopUp({msg, wid, buttonTxt, pos}) {
  const align = (buttonTxt === "cancel") ? "end" : "center"
  return (
    <div className='PopUp'>
      <div className='OuterBox' style={{ top: pos.top, left: pos.left, width: wid+"px" }}>
          <p>x</p>
          <div className='InnerBox'>
              <p className='message'>{msg}</p>
              <button style={{alignSelf: align}}>{buttonTxt}</button>
          </div> 
      </div>
    </div>
  ) 
} 

export default PopUp