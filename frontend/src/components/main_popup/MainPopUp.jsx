import React from 'react'
import './MainPopUp.css' 

import { useNavigate } from 'react-router'

function MainPopUp({ onClose }) {
  const nav = useNavigate();
  return (
    <div className='MainPopUp'>
      <div className='OuterBox'>
          <button className='close' onClick={onClose}>x</button>
          <div className='InnerBox'>
              <div className='Text'>
                <h2>MESMOS</h2>
                <p>ready to enter the cosmos of memories?</p>
              </div>
              <div className='controls'>
                <button onClick = {()=>{nav("/home")}}>Ok</button>
                <button onClick = {()=>{window.location.href="https://www.google.com"}}>Cancel</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default MainPopUp
