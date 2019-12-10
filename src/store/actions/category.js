import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  CATEGORIES_ERROR,
  LOAD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY_PHOTOS
} from './actionTypes';

//Get all categories

export const getAllCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/category');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get category by ID
export const getCategoryById = categoryID => async dispatch => {
  try {
    dispatch({ type: LOAD_CATEGORY });
    const res = await axios.get(`/api/category/${categoryID}`);

    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get a category's photos
export const getCategoryPhotos = (categoryID, page) => async dispatch => {
  try {
    dispatch({ type: LOAD_CATEGORY });

    const res = await axios.get(
      `/api/category/${categoryID}/photos?page=${page}`
    );

    dispatch({
      type: GET_CATEGORY_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get a category with photos by period with pagination
export const getCategoryTimePhotos = (
  categoryID,
  periodID,
  page
) => async dispatch => {
  try {
    dispatch({ type: LOAD_CATEGORY });
    const res = await axios.get(
      `/api/category/${categoryID}/photos-period/${periodID}?page=${page}`
    );
    dispatch({
      type: GET_CATEGORY_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update category
export const createCategory = (
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

    const res = await axios.post('/api/category', formData, config);

    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });

    dispatch(
      setAlert(
        edit ? 'Category Info Updated' : 'Category Info Added',
        'success'
      )
    );

    if (!edit) {
      history.push('/adm/categories');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete category
export const deleteCategory = categoryID => async dispatch => {
  try {
    await axios.delete(`/api/category/${categoryID}`);

    dispatch({ type: DELETE_CATEGORY, payload: categoryID });
    // history.push('/adm/categories');
    dispatch(setAlert('Your category has been deleted'));
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
