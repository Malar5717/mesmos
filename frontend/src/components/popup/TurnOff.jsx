import React from "react";

import "./TurnOff.css";

function TurnOff() {
  return (
    <div className="TurnOff">
      <div className="OuterBox">
        <p>Turn Off</p>
  
        <div className="InnerBox">
  
          <div className="mode StandBy">
            <div className="opt">x</div>
            <p className="name">Stand By</p>
          </div>
  
          <div className="mode Restart">
            <div className="opt">x</div>
            <p className="name">Restart</p>
          </div>
  
          <div className="mode ShutDown">
            <div className="opt">x</div>
            <p className="name">Turn Off</p>
          </div>
  
        </div>
        
      </div>
    </div>
  );
}

export default TurnOff;
