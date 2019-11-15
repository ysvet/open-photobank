import {
  GET_LOCATIONS,
  GET_LOCATION,
  LOCATIONS_ERROR,
  LOAD_LOCATION,
  DELETE_LOCATION,
  GET_LOCATION_PHOTOS
} from '../actions/actionTypes';

const initialState = {
  locationObj: null,
  locations: [],
  photos: [],
  totalPhotos: 0,
  currentPage: null,
  hasNextPage: null,
  nextPage: 0,
  hasPreviousPage: null,
  lastPage: 0,
  previousPage: 1,
  itemsPerPage: 0,
  loading: true,
  error: {}
};

const location = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: payload,
        loading: false
      };
    case GET_LOCATION:
      return {
        ...state,
        locationObj: payload,
        loading: false
      };
    case GET_LOCATION_PHOTOS:
      return {
        ...state,
        photos: payload.locationPhotos,
        locationObj: payload.location,
        totalPhotos: payload.totalPhotos,
        currentPage: payload.currentPage,
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        hasPreviousPage: payload.hasPreviousPage,
        lastPage: payload.lastPage,
        previousPage: payload.previousPage,
        itemsPerPage: payload.itemsPerPage,
        loading: false
      };
    case LOAD_LOCATION:
      return {
        ...state,
        loading: true
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          location => location.locationID !== payload
        ),
        loading: false
      };
    case LOCATIONS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default location;
