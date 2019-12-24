import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ALBUMS,
  GET_ALBUM,
  ALBUMS_ERROR,
  LOAD_ALBUM,
  DELETE_ALBUM,
  GET_ALBUM_PHOTOS,
  GET_ALBUM_PHOTOS_NOPAG
} from './actionTypes';

//Get all albums with pagination

export const getAllAlbums = page => async dispatch => {
  try {
    const res = await axios.get(`/api/album?page=${page}`);
    dispatch({
      type: GET_ALBUMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ALBUMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all albums with no pagination

export const getAllAlbumsNoPage = page => async dispatch => {
  try {
    const res = await axios.get(`/api/album/all/`);
    dispatch({
      type: GET_ALBUMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ALBUMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get album by ID
export const getAlbumById = albumID => async dispatch => {
  try {
    dispatch({ type: LOAD_ALBUM });
    const res = await axios.get(`/api/album/${albumID}`);
    dispatch({
      type: GET_ALBUM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ALBUMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get an album with photos with pagination
export const getAlbumPhotos = (albumID, page) => async dispatch => {
  try {
    dispatch({ type: LOAD_ALBUM });
    const res = await axios.get(`/api/album/${albumID}/photos?page=${page}`);
    dispatch({
      type: GET_ALBUM_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ALBUMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get an album with photos with no pagination
export const getAlbumPhotosNav = albumID => async dispatch => {
  try {
    dispatch({ type: LOAD_ALBUM });
    const res = await axios.get(`/api/album/${albumID}/photosNav`);
    dispatch({
      type: GET_ALBUM_PHOTOS_NOPAG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ALBUMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update album
export const createAlbum = (
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

    const res = await axios.post('/api/album', formData, config);

    dispatch({
      type: GET_ALBUM,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? 'Album Info Updated' : 'Album Info Added', 'success')
    );

    if (!edit) {
      history.push('/adm/albums');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ALBUMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete album
export const deleteAlbum = albumID => async dispatch => {
  try {
    await axios.delete(`/api/album/${albumID}`);

    dispatch({ type: DELETE_ALBUM, payload: albumID });

    dispatch(setAlert('Album has been deleted'));
  } catch (err) {
    dispatch({
      type: ALBUMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
