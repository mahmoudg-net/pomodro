export const WORK = "WORK";
export const BREAK = "BREAK";
export const START = "START";
export const PAUSE = "PAUSE";
export const RESET = "RESET";
export const INCREASE_DURATION = "INCREASE_DURATION";
export const DECREASE_DURATION = "DECREASE_DURATION";
export const DECREASE_REMAINING_TIME = "DECREASE_REMAINING_TIME";

export const IncreaseDuration = (sessionToIncrease) => {
  return {
    type: INCREASE_DURATION,
    payload: sessionToIncrease,
  };
};

export const DecreaseDuration = (sessionToDecrease) => {
  return {
    type: DECREASE_DURATION,
    payload: sessionToDecrease,
  };
};

export const Reset = () => {
  return {
    type: RESET,
  };
};

export const Start = () => {
  return {
    type: START,
  };
};

export const Pause = () => {
  return {
    type: PAUSE,
  };
};

export const DecreaseRemainingTime = () => {
  return {
    type: DECREASE_REMAINING_TIME,
  };
};
