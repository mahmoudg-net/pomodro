import React from "react";
import "./App.css";

function App() {
  return (
    <div id="appContainer" className="container">
      <div className="App">
        <h1 id="appHeader">Pomodro Clock</h1>
        <div id="timer-label">New Session</div>
        <div id="time-left">25:00</div>
        <div className="row">
          <i id="start_stop" class="far fa-play-circle fa-2x"></i>
          <i id="reset" class="fas fa-power-off fa-2x"></i>
        </div>
        <div className="row">
          <div className="card timeLength">
            <div id="session-label" className="timeLengthLabel">
              Session length
            </div>
            <div id="session-length" className="timeLengthValue">
              25
            </div>
            <i id="session-increment" className="fas fa-arrow-circle-up"></i>
            <i id="session-decrement" className="fas fa-arrow-circle-down"></i>
          </div>
          <div className="card timeLength">
            <div id="break-label" className="timeLengthLabel">
              Break length
            </div>
            <div id="break-length" className="timeLengthValue">
              5
            </div>
            <i id="break-increment" className="fas fa-arrow-circle-up"></i>
            <i id="break-decrement" className="fas fa-arrow-circle-down"></i>
          </div>
        </div>
        <div className="card-footer">by Mahmoud Gatfi</div>
      </div>
    </div>
  );
}

export default App;
