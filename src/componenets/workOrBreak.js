import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { WORK } from "../redux/actions";

const Presentation = (props) => {
  return (
    <h3 id="timer-label">
      {props.clockStatus === WORK ? "Be brave and work" : "Chill out"}
    </h3>
  );
};

Presentation.propTypes = {
  clockStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    clockStatus: state.clockStatus,
  };
};

const WorkOrBreak = connect(mapStateToProps, null)(Presentation);

export default WorkOrBreak;
