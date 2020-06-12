import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SessionInfo from "./componenets/sessionInfo";
import ActionButtons from "./componenets/actionButtons";
import SessionDuration from "./componenets/sessionDuration";
import { WORK, BREAK } from "./redux/actions";
import "./App.css";

class Presentation extends React.Component {
  render() {
    return (
      <div id="appContainer" className="container">
        <div className="App">
          <h1 id="appHeader">Pomodro Clock</h1>
          <SessionInfo />
          <ActionButtons />
          <div className="row">
            <SessionDuration
              sessionLabel={WORK}
              idLabel="session-label"
              idLength="session-length"
              incrementLabel="session"
            />
            <SessionDuration
              sessionLabel={BREAK}
              idLabel="break-label"
              idLength="break-length"
              incrementLabel="break"
            />
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
