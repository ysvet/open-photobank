import {
  GET_CONTRIBUTORS,
  GET_CONTRIBUTOR,
  CONTRIBUTORS_ERROR,
  LOAD_CONTRIBUTOR,
  DELETE_CONTRIBUTOR,
  GET_CONTRIBUTOR_PHOTOS
} from '../actions/actionTypes';

const initialState = {
  contributor: null,
  contributors: [],
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

const contributor = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTRIBUTORS:
      return {
        ...state,
        contributors: payload,
        loading: false
      };
    case GET_CONTRIBUTOR:
      return {
        ...state,
        contributor: payload,
        loading: false
      };
    case GET_CONTRIBUTOR_PHOTOS:
      return {
        ...state,
        photos: payload.contributorPhotos,
        contributor: payload.contributor,
        totalPhotos: payload.totalPhotos,
        currentPage: payload.currentPage,
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        hasPreviousPage: payload.hasPreviousPage,
        lastPage: payload.lastPage,
        previousPage: payload.previousPage,
        loading: false
      };
    case LOAD_CONTRIBUTOR:
      return {
        ...state,
        loading: true
      };
    case DELETE_CONTRIBUTOR:
      return {
        ...state,
        contributors: state.contributors.filter(
          contributor => contributor.contributorID !== payload
        ),
        loading: false
      };
    case CONTRIBUTORS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default contributor;
