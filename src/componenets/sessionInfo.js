import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { WORK, BREAK } from "../redux/actions";

class Presentation extends React.Component {
  render() {
    const { clockStatus, remainingTime } = { ...this.props };
    const seconds = (remainingTime % 60).toString();
    const minutes = Math.floor(remainingTime / 60).toString();
    const displayTime = `${minutes.length === 1 ? "0" + minutes : minutes}:${
      seconds.length === 1 ? "0" + seconds : seconds
    }`;
    return (
      <React.Fragment>
        <h3 id="timer-label">
          {clockStatus === WORK
            ? "Be brave and work"
            : clockStatus === BREAK
            ? "Chill out"
            : ""}
        </h3>
        <div id="time-left">{displayTime}</div>
      </React.Fragment>
    );
  }
}

Presentation.propTypes = {
  clockStatus: PropTypes.string.isRequired,
  remainingTime: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    clockStatus: state.clockStatus,
    remainingTime: state.remainingTime,
  };
};

const SessionInfo = connect(mapStateToProps, null)(Presentation);

export default SessionInfo;
