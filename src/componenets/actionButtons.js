import React from "react";
import { connect } from "react-redux";
import { Start, Pause, Reset, DecreaseRemainingTime } from "../redux/actions";

const PresentationButton = (props) => {
  const { id, className, clickHandler } = { ...props };
  return (
    <i
      id={id}
      className={className}
      style={{ cursor: "pointer" }}
      onClick={() => {
        clickHandler();
      }}
    ></i>
  );
};

class PresentationActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
    };
    this.startPauseClickHandler = this.startPauseClickHandler.bind(this);
  }

  componentDidUpdate() {
    if (this.props.remainingTime === 0) {
      document.getElementById("beep").play();
    }
  }

  startPauseClickHandler() {
    const { isStarted, isPaused, doStart, doPause, doDecreaseRemainingTime } = {
      ...this.props,
    };
    if (!isStarted || isPaused) {
      doStart();
      const intervalReference = setInterval(() => {
        doDecreaseRemainingTime();
      }, 1000);
      this.setState({ interval: intervalReference });
    } else {
      doPause();
      clearInterval(this.state.interval);
      this.setState({ interval: null });
    }
  }

  render() {
    const { isStarted, isPaused, doReset } = { ...this.props };
    const startStopClassName =
      !isStarted || isPaused
        ? "far fa-play-circle fa-2x"
        : "far fa-pause-circle fa-2x";

    return (
      <div className="row">
        <PresentationButton
          id="start_stop"
          className={startStopClassName}
          clickHandler={this.startPauseClickHandler}
        />
        <PresentationButton
          id="reset"
          className="fas fa-power-off fa-2x"
          clickHandler={() => {
            clearInterval(this.state.interval);
            const audio = document.getElementById("beep");
            if (!audio.paused) {
              audio.load();
            }
            this.setState({ interval: null });
            doReset();
          }}
        />
        <audio id="beep" style={{ display: "none" }}>
          <source
            src="http://soundbible.com/mp3/Pager Beeps-SoundBible.com-260751720.mp3"
            type="audio/mpeg"
          />
        </audio>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isStarted: state.isStarted,
    isPaused: state.isPaused,
    remainingTime: state.remainingTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doStart: () => dispatch(Start()),
    doPause: () => dispatch(Pause()),
    doReset: () => dispatch(Reset()),
    doDecreaseRemainingTime: () => dispatch(DecreaseRemainingTime()),
  };
};

const ActionButtons = connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentationActionButtons);

export default ActionButtons;
