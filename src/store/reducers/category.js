import {
  GET_CATEGORIES,
  GET_CATEGORY,
  CATEGORIES_ERROR,
  LOAD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY_PHOTOS
} from '../actions/actionTypes';

const initialState = {
  category: null,
  categories: [],
  categoryPhotos: [],
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

const category = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false
      };
    case GET_CATEGORY_PHOTOS:
      return {
        ...state,
        categoryPhotos: payload.categoryPhotos,
        category: payload.category,
        totalPhotos: payload.totalPhotos,
        currentPage: payload.currentPage,
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        hasPreviousPage: payload.hasPreviousPage,
        lastPage: payload.lastPage,
        previousPage: payload.previousPage,
        loading: false
      };
    case LOAD_CATEGORY:
      return {
        ...state,
        loading: true
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.categoryID !== payload
        ),
        loading: false
      };
    case CATEGORIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default category;
