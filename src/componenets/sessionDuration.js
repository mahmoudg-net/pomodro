import React from "react";
import { connect } from "react-redux";
import {
  WORK,
  BREAK,
  IncreaseDuration,
  DecreaseDuration,
} from "../redux/actions";

const Presentation = (props) => {
  const {
    idLabel,
    idLength,
    sessionLabel,
    sessionDuration,
    doIncrement,
    doDecrement,
    incrementLabel,
  } = {
    ...props,
  };
  return (
    <div className="card timeLength">
      <div id={idLabel} className="timeLengthLabel">
        <span style={{ fontWeight: "bold" }}>{sessionLabel.toLowerCase()}</span>{" "}
        session
      </div>
      <div id={idLength} className="timeLengthValue">
        {sessionDuration / 60}
      </div>
      <i
        id={`${incrementLabel}-increment`}
        className="fas fa-arrow-circle-up increment"
        onClick={() => {
          doIncrement();
        }}
      ></i>
      <i
        id={`${incrementLabel}-decrement`}
        className="fas fa-arrow-circle-down decrement"
        onClick={() => {
          doDecrement();
        }}
      ></i>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const duration =
    ownProps.sessionLabel.toUpperCase() === WORK
      ? state.workLength
      : ownProps.sessionLabel.toUpperCase() === BREAK
      ? state.breakLength
      : 0;
  return {
    sessionDuration: duration,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    doIncrement: () => {
      dispatch(IncreaseDuration(ownProps.sessionLabel.toUpperCase()));
    },
    doDecrement: () => {
      dispatch(DecreaseDuration(ownProps.sessionLabel.toUpperCase()));
    },
  };
};

const SessionDuration = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentation);
export default SessionDuration;
