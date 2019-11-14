import {
  GET_ALBUMS,
  GET_ALBUM,
  ALBUMS_ERROR,
  LOAD_ALBUM,
  DELETE_ALBUM,
  GET_ALBUM_PHOTOS
} from '../actions/actionTypes';

const initialState = {
  album: null,
  albums: [],
  loading: true,
  totalPhotos: 0,
  totalAlbums: 0,
  currentPage: null,
  hasNextPage: null,
  nextPage: 0,
  hasPreviousPage: null,
  lastPage: 0,
  previousPage: 1,
  error: {},
  photos: []
};

const album = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALBUMS:
      return {
        ...state,
        albums: payload.albums,
        totalAlbums: payload.totalAlbums,
        currentPage: payload.currentPage,
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        hasPreviousPage: payload.hasPreviousPage,
        lastPage: payload.lastPage,
        previousPage: payload.previousPage,
        loading: false
      };
    case LOAD_ALBUM:
      return {
        ...state,
        loading: true
      };
    case GET_ALBUM:
      return {
        ...state,
        album: payload,
        loading: false
      };
    case GET_ALBUM_PHOTOS:
      return {
        ...state,
        photos: payload.albumPhotos,
        album: payload.album,
        totalPhotos: payload.totalPhotos,
        currentPage: payload.currentPage,
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        hasPreviousPage: payload.hasPreviousPage,
        lastPage: payload.lastPage,
        previousPage: payload.previousPage,
        loading: false
      };
    case DELETE_ALBUM:
      return {
        ...state,
        albums: state.albums.filter(album => album.albumID !== payload),
        loading: false
      };
    case ALBUMS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default album;
