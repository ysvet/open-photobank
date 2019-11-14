import {
  GET_PHOTOS,
  PHOTOS_ERROR,
  GET_PHOTO,
  DELETE_PHOTO,
  LOAD_PHOTO,
  CLEAR_PHOTO
} from '../actions/actionTypes';

const initialState = {
  photo: null,
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

const photo = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: payload.photos,
        totalPhotos: payload.totalPhotos,
        currentPage: payload.currentPage,
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        hasPreviousPage: payload.hasPreviousPage,
        lastPage: payload.lastPage,
        previousPage: payload.previousPage,
        loading: false
      };
    case GET_PHOTO:
      return {
        ...state,
        photo: payload,
        loading: false
      };
    case LOAD_PHOTO:
      return {
        ...state,
        loading: true
      };
    case DELETE_PHOTO:
      return {
        ...state,
        photos: state.photos.filter(photo => photo.photoID !== payload),
        loading: false
      };
    case CLEAR_PHOTO:
      return {
        ...state,
        photo: null,
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

export default photo;
