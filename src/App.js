import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import WorkOrBreak from "./componenets/workOrBreak";
import "./App.css";

class Presentation extends React.Component {
  render() {
    return (
      <div id="appContainer" className="container">
        <div className="App">
          <h1 id="appHeader">Pomodro Clock</h1>
          <WorkOrBreak />
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
              <i
                id="session-decrement"
                className="fas fa-arrow-circle-down"
              ></i>
            </div>
            <div className="card timeLength">
              <div id="break-label" className="timeLengthLabel">
                Break length
              </div>
              <div id="break-length" className="timeLengthValue">
                5
              </div>
              <i
                id="break-increment"
                className="fas fa-arrow-circle-up increment"
              ></i>
              <i
                id="break-decrement"
                className="fas fa-arrow-circle-down decrement"
              ></i>
            </div>
          </div>
          <div class="text-muted">by Mahmoud Gatfi</div>
        </div>
      </div>
    );
  }
}

function App(props) {
  return (
    <Provider store={store}>
      <Presentation />
    </Provider>
  );
}

export default App;
