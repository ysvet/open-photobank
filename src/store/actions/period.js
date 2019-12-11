import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PERIODS,
  GET_PERIOD,
  LOAD_PERIOD,
  PERIODS_ERROR,
  DELETE_PERIOD,
  GET_PERIOD_PHOTOS
} from './actionTypes';

//Get all periods

export const getAllPeriods = () => async dispatch => {
  try {
    const res = await axios.get('/api/period');
    dispatch({
      type: GET_PERIODS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PERIODS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get period by ID
export const getTimePeriodById = periodID => async dispatch => {
  try {
    dispatch({ type: LOAD_PERIOD });
    const res = await axios.get(`/api/period/${periodID}`);
    dispatch({
      type: GET_PERIOD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PERIODS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get an period with photos with pagination
export const getPeriodPhotos = (periodID, page) => async dispatch => {
  try {
    dispatch({ type: LOAD_PERIOD });
    const res = await axios.get(`/api/period/${periodID}/photos?page=${page}`);
    dispatch({
      type: GET_PERIOD_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PERIODS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get a period with photos by category with pagination
export const getPeriodCatPhotos = (
  periodID,
  categoryID,
  page
) => async dispatch => {
  try {
    dispatch({ type: LOAD_PERIOD });
    const res = await axios.get(
      `/api/period/${periodID}/photos/${categoryID}?page=${page}`
    );
    dispatch({
      type: GET_PERIOD_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PERIODS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update period
export const createTimePeriod = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/period', formData, config);

    dispatch({
      type: GET_PERIOD,
      payload: res.data
    });

    dispatch(
      setAlert(
        edit ? 'Time period Info Updated' : 'Time period Info Added',
        'success'
      )
    );

    if (!edit) {
      history.push('/adm/periods');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PERIODS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete period
export const deletePeriod = periodID => async dispatch => {
  try {
    await axios.delete(`/api/period/${periodID}`);

    dispatch({ type: DELETE_PERIOD, payload: periodID });

    dispatch(setAlert('Time period has been deleted'));
  } catch (err) {
    dispatch({
      type: PERIODS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
