import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_LOCATIONS,
  GET_LOCATION,
  LOAD_LOCATION,
  LOCATIONS_ERROR,
  DELETE_LOCATION,
  GET_LOCATION_PHOTOS
} from './actionTypes';

//Get all locations

export const getAllLocations = () => async dispatch => {
  try {
    const res = await axios.get('/api/location');
    dispatch({
      type: GET_LOCATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get location by ID
export const getLocationById = locationID => async dispatch => {
  try {
    dispatch({ type: LOAD_LOCATION });
    const res = await axios.get(`/api/location/${locationID}`);

    dispatch({
      type: GET_LOCATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get a location with photos with pagination
export const getLocationPhotos = (locationID, page) => async dispatch => {
  try {
    dispatch({ type: LOAD_LOCATION });
    const res = await axios.get(
      `/api/location/${locationID}/photos?page=${page}`
    );
    dispatch({
      type: GET_LOCATION_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// // Get location by name
// export const getLocationByName = locationName => async dispatch => {
//   try {
//     const encodeName = encodeURIComponent(locationName);
//     const res = await axios.get(`/api/location/${encodeName}/name`);

//     dispatch({
//       type: GET_LOCATION_BY_NAME,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: LOCATIONS_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Create or update location
export const createLocation = (
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

    const res = await axios.post('/api/location', formData, config);

    dispatch({
      type: GET_LOCATION,
      payload: res.data
    });

    dispatch(
      setAlert(
        edit ? 'Location Info Updated' : 'Location Info Added',
        'success'
      )
    );

    if (!edit) {
      history.push('/adm/locations');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOCATIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete location
export const deleteLocation = locationID => async dispatch => {
  try {
    await axios.delete(`/api/location/${locationID}`);

    dispatch({ type: DELETE_LOCATION, payload: locationID });

    dispatch(setAlert('Location has been deleted'));
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
