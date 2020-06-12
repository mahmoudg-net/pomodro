import {
  WORK,
  BREAK,
  INCREASE_DURATION,
  DECREASE_DURATION,
  RESET,
  START,
  PAUSE,
  DECREASE_REMAINING_TIME,
} from "./actions";

const DEFAULT_WORK_LENGTH = 1500;
const DEFAULT_BREAK_LENGTH = 300;
const MAX_LENGTH = 3600;
const MIN_LENGTH = 60;

const initialState = {
  clockStatus: WORK,
  workLength: DEFAULT_WORK_LENGTH,
  breakLength: DEFAULT_BREAK_LENGTH,
  remainingTime: DEFAULT_WORK_LENGTH,
  isStarted: false,
  isPaused: false,
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
        ? stateWorkLength < MAX_LENGTH
          ? stateWorkLength + 60
          : MAX_LENGTH
        : stateWorkLength > MIN_LENGTH + 60
        ? stateWorkLength - 60
        : MIN_LENGTH,
    };
  } else {
    return {
      breakLength: doIncrease
        ? stateBreakLength < MAX_LENGTH
          ? stateBreakLength + 60
          : MAX_LENGTH
        : stateBreakLength > MIN_LENGTH + 60
        ? stateBreakLength - 60
        : MIN_LENGTH,
    };
  }
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_DURATION:
      let ret = Object.assign(
        {},
        state,
        updateDuration(
          action.payload,
          state.workLength,
          state.breakLength,
          true
        )
      );
      if (state.clockStatus === WORK && !state.isStarted) {
        ret.remainingTime = ret.workLength;
      }
      return ret;
    case DECREASE_DURATION:
      const retd = Object.assign(
        {},
        state,
        updateDuration(
          action.payload,
          state.workLength,
          state.breakLength,
          false
        )
      );
      if (state.clockStatus === WORK && !state.isStarted) {
        retd.remainingTime = retd.workLength;
      }
      return retd;
    case RESET:
      return Object.assign({}, initialState);
    case START:
      let length = state.remainingTime;
      let clockStatus = state.clockStatus;
      if (!state.isStarted) {
        length = state.workLength;
        clockStatus = WORK;
      }
      if (!state.isStarted || state.isPaused) {
        return Object.assign({}, state, {
          isStarted: true,
          isPaused: false,
          clockStatus: clockStatus,
          remainingTime: length,
        });
      }
      return state;
    case PAUSE:
      return {
        ...state,
        ...{ isPaused: true },
      };
    case DECREASE_REMAINING_TIME:
      if (state.isStarted && !state.isPaused) {
        const toReturn = {
          ...state,
          ...{
            remainingTime:
              state.remainingTime > 0
                ? state.remainingTime - 1
                : state.remainingTime,
          },
        };
        if (state.remainingTime === 0) {
          toReturn.clockStatus = state.clockStatus === WORK ? BREAK : WORK;
          toReturn.remainingTime =
            state.clockStatus === WORK ? state.breakLength : state.workLength;
        }
        return toReturn;
      } else {
        return state;
      }
    default:
      return state;
  }
};
