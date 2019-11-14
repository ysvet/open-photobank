import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PHOTOS,
  PHOTOS_ERROR,
  GET_PHOTO,
  DELETE_PHOTO,
  LOAD_PHOTO
} from './actionTypes';

//Get all photos

export const getAllPhotos = page => async dispatch => {
  try {
    const res = await axios.get(`/api/photo?page=${page}`);
    dispatch({
      type: GET_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get a photo by ID
export const getPhotoById = photo_id => async dispatch => {
  try {
    // dispatch({ type: CLEAR_PHOTO });
    dispatch({ type: LOAD_PHOTO });
    const res = await axios.get(`/api/photo/${photo_id}`);

    dispatch({
      type: GET_PHOTO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update photo (in this app - create)
export const createPhoto = (form, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = await axios.post('/api/photo/upload', form, config);

    dispatch({
      type: GET_PHOTO,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? 'Photo Info Updated' : 'Photo Info Added', 'success')
    );

    if (!edit) {
      history.push('/adm/photos');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PHOTOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update photo (in this app - Update)
export const editPhoto = (form, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/photo', form, config);

    dispatch({
      type: GET_PHOTO,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? 'Photo Info Updated' : 'Photo Info Added', 'success')
    );

    if (!edit) {
      history.push('/adm/photos');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PHOTOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete photo
export const deletePhoto = photoID => async dispatch => {
  try {
    await axios.delete(`/api/photo/${photoID}`);

    dispatch({ type: DELETE_PHOTO, payload: photoID });

    dispatch(setAlert('Your photo has been deleted'));
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Download a photo by ID
export const downloadPhoto = photo_id => async dispatch => {
  try {
    dispatch({ type: LOAD_PHOTO });
    const res = await axios.get(`/api/photo/download/${photo_id}`);

    dispatch({
      type: GET_PHOTO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
