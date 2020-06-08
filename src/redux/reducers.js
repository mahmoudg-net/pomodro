import {
  WORK,
  BREAK,
  INCREASE_DURATION,
  DECREASE_DURATION,
  RESET,
  START,
  PAUSE,
} from "./actions";

const DEFAULT_WORK_LENGTH = 25;
const DEFAULT_BREAK_LENGTH = 5;
const MAX_LENGTH = 60;
const MIN_LENGTH = 1;

const initialState = {
  clockStatus: WORK,
  workLength: DEFAULT_WORK_LENGTH,
  breakLength: DEFAULT_BREAK_LENGTH,
  remainingTime: DEFAULT_WORK_LENGTH,
  isStarted: false,
  isPaused: false,
  timer: null,
};

const updateDuration = (
  whatToUpdate,
  stateWorkLength,
  stateBreakLength,
  doIncrease
) => {
  if (whatToUpdate === WORK) {
    return {
      workLength: doIncrease
        ? stateWorkLength < 60
          ? stateWorkLength + 1
          : 60
        : stateWorkLength > 1
        ? stateWorkLength - 1
        : 1,
    };
  } else {
    return {
      breakLength: doIncrease
        ? stateBreakLength < 60
          ? stateBreakLength + 1
          : 60
        : stateBreakLength > 1
        ? stateBreakLength - 1
        : 1,
    };
  }
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_DURATION:
      return Object.assign(
        {},
        state,
        updateDuration(
          action.payload,
          state.workLength,
          state.breakLength,
          true
        )
      );
    case DECREASE_DURATION:
      return Object.assign(
        {},
        state,
        updateDuration(
          action.payload,
          state.workLength,
          state.breakLength,
          false
        )
      );
    case RESET:
      return initialState;
    case START:
      if (!state.isStarted) {
        const timer = setInterval(
          (s) => {
            return {
              ...s,
              ...{ remainingTime: s.remainingTime - 1 },
            };
          },
          1000,
          state
        );
        return Object.assign({}, state, {
          timer: timer,
          isStarted: true,
        });
      }
      return state;
    case PAUSE:
      clearInterval(state.timer);
      return {
        ...state,
        ...{ timer: null, isPaused: true },
      };
    default:
      return state;
  }
};
