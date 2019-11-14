import axios from 'axios';

import { SEARCH_PHOTOS, PHOTOS_ERROR, CLEAR_SEARCH } from './actionTypes';

// Search photos
export const searchPhotos = q => async dispatch => {
  try {
    const res = await axios.get(`/api/search?q=${q}`);
    dispatch({
      type: SEARCH_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const clearSearch = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_SEARCH
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
