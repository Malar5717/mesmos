import React, { useState } from "react";

import "./PreLoader.css";

import PopUp from "../../components/popup/PopUp";
import MainPopUp from "../../components/main_popup/MainPopUp";
import TurnOff from "../../components/popup/TurnOff";
import Canvas from "../../components/popup/Canvas";

function PreLoader() {
  const [isClose, setIsClose] = useState(false);

  const handleClose = () => {
    setIsClose(true);
  }

  // function to render randomised popups
  function renderPopUps() {
    let popups = [
      {
        message:
          "An error has occurred while trying to display the error message.",
        width: 548,
        buttonText: "cancel",
      },
      {
        message: "clear your evidence?",
        width: 224,
        buttonText: "free-up",
      },
      {
        message: "There is no where you can escape to",
        width: 450,
        buttonText: "run.",
      },
      {
        message: "Task failed successfully!",
        width: 408,
        buttonText: "yay!",
      },
    ];

    const pos = 
    [[
      { top: "3%", left: "16%" },
      { top: "7%", left: "58%" },
      { top: "26%", left: "4%" },
      { top: "65%", left: "24%" },
      { top: "30%", left: "75%" },
      { top: "55%", left: "65%" }
    ], 
    [
      { top: "6%", left: "45%" },
      { top: "1%", left: "34%" },
      { top: "55%", left: "6%" },
      { top: "75%", left: "54%" },
      { top: "17%", left: "10%" },
      { top: "20%", left: "68%" }
    ],
    [
      { top: "15%", left: "4%" },
      { top: "72%", left: "61%" },
      { top: "5%", left: "60%" },
      { top: "45%", left: "65%" },
      { top: "11%", left: "48%" },
      { top: "50%", left: "8%" }
    ],
    [
      { top: "75%", left: "4%" },
      { top: "72%", left: "61%" },
      { top: "2%", left: "70%" },
      { top: "27%", left: "60%" },
      { top: "11%", left: "18%" },
      { top: "5%", left: "28%" }
    ]];

    const randInt = Math.floor(Math.random() * pos.length);

    const PopUps = popups.map((pop, idx) => (
      <PopUp
        key={idx}
        pos={pos[randInt][idx]}
        pop={pop} // popups[idx] extracted from .map()
        popDelay={(idx+1)*100}
        onClose={handleClose}
      />
    ));
    PopUps.push(<TurnOff key={4} pos={pos[randInt][4]} />);
    PopUps.push(<Canvas key={5} pos={pos[randInt][5]} onClose={handleClose} />);
    return PopUps;
  }

  return (
    <div>
      {/* {!isClose && renderPopUps()} */}
      {renderPopUps()}
      <MainPopUp />
      {/* {!isClose && <MainPopUp onClose={handleClose} />} */}
    </div>
  );
}

export default PreLoader;
