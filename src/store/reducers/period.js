import {
  GET_PERIODS,
  GET_PERIOD,
  LOAD_PERIOD,
  PERIODS_ERROR,
  DELETE_PERIOD,
  GET_PERIOD_PHOTOS
} from '../actions/actionTypes';

const initialState = {
  period: null,
  periods: [],
  photos: [],
  totalPhotos: 0,
  currentPage: null,
  hasNextPage: null,
  nextPage: 0,
  hasPreviousPage: null,
  lastPage: 0,
  previousPage: 1,
  loading: true,
  error: {}
};

const period = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PERIODS:
      return {
        ...state,
        periods: payload,
        loading: false
      };
    case GET_PERIOD:
      return {
        ...state,
        period: payload,
        loading: false
      };
    case LOAD_PERIOD:
      return {
        ...state,
        loading: true
      };
    case GET_PERIOD_PHOTOS:
      return {
        ...state,
        photos: payload.periodPhotos,
        period: payload.period,
        totalPhotos: payload.totalPhotos,
        currentPage: payload.currentPage,
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        hasPreviousPage: payload.hasPreviousPage,
        lastPage: payload.lastPage,
        previousPage: payload.previousPage,
        loading: false
      };
    case DELETE_PERIOD:
      return {
        ...state,
        periods: state.periods.filter(period => period.periodID !== payload),
        loading: false
      };
    case PERIODS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default period;
