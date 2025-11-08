import React from 'react'

import './PreLoader.css'

import PopUp from '../../components/popup/PopUp'
import MainPopUp from '../../components/main_popup/MainPopUp'
import TurnOff from '../../components/popup/TurnOff'
import Canvas from '../../components/popup/Canvas'

function PreLoader() {

  // function to render randomised popups
  function renderPopUps(){
    let popups = ["An error has occurred while trying to display the error message.", "clear your evidence?", "There is no where you can escape to", "Task failed successfully!"]
    let wid = [548, 224, 450, 408] 
    let buttonTxt = ["cancel", "free-up", "run.", "yay!"]

    const pos = [{top: "10%", left: "50%"}, {top: "50%", left: "10%"}, {top: "10%", left: "10%"}, {top: "35%", left: "75%"}]

    const PopUps = popups.map((txt, idx) => (
      <PopUp 
        key = {idx}
        msg = {txt}
        pos = {pos[idx]}
        wid = {wid[idx]}
        buttonTxt = {buttonTxt[idx]}
      />
    ))
    return PopUps

  }
  
  return (
    <div>
      {renderPopUps()}
      <MainPopUp />
      <TurnOff />
      <Canvas />
    </div>
  )
}

export default PreLoader 
