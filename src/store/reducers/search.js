import {
  SEARCH_PHOTOS,
  PHOTOS_ERROR,
  CLEAR_SEARCH
} from '../actions/actionTypes';

const initialState = {
  photos: [0],
  loading: true,
  error: {}
};

const search = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_PHOTOS:
      return {
        ...state,
        photos: payload,
        loading: false
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        photos: [0],
        loading: false
      };
    case PHOTOS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default search;
