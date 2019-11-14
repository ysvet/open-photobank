import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CONTRIBUTORS,
  GET_CONTRIBUTOR,
  CONTRIBUTORS_ERROR,
  LOAD_CONTRIBUTOR,
  DELETE_CONTRIBUTOR,
  GET_CONTRIBUTOR_PHOTOS
} from './actionTypes';

//Get all contributors

export const getAllContributors = () => async dispatch => {
  try {
    const res = await axios.get('/api/contributor');
    dispatch({
      type: GET_CONTRIBUTORS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTRIBUTORS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get contributor by ID
export const getContributorById = contributorID => async dispatch => {
  try {
    dispatch({ type: LOAD_CONTRIBUTOR });
    const res = await axios.get(`/api/contributor/${contributorID}`);
    dispatch({
      type: GET_CONTRIBUTOR,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTRIBUTORS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get a contributor with photos woth pagination
export const getContributorPhotos = (contributorID, page) => async dispatch => {
  try {
    dispatch({ type: LOAD_CONTRIBUTOR });
    const res = await axios.get(
      `/api/contributor/${contributorID}/photos?page=${page}`
    );
    dispatch({
      type: GET_CONTRIBUTOR_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTRIBUTORS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update contributor
export const createContributor = (
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

    const res = await axios.post('/api/contributor', formData, config);

    dispatch({
      type: GET_CONTRIBUTOR,
      payload: res.data
    });

    dispatch(
      setAlert(
        edit ? 'Contributor Info Updated' : 'Contributor Info Added',
        'success'
      )
    );

    if (!edit) {
      history.push('/adm/contributors');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONTRIBUTORS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete contributor
export const deleteContributor = contributorID => async dispatch => {
  try {
    await axios.delete(`/api/contributor/${contributorID}`);

    dispatch({ type: DELETE_CONTRIBUTOR, payload: contributorID });

    dispatch(setAlert('Contributor has been deleted'));
  } catch (err) {
    dispatch({
      type: CONTRIBUTORS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
