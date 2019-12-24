import {
  GET_ALBUMS,
  GET_ALBUM,
  ALBUMS_ERROR,
  LOAD_ALBUM,
  DELETE_ALBUM,
  GET_ALBUM_PHOTOS,
  GET_ALBUM_PHOTOS_NOPAG
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
  albumsPerPage: 0,
  itemsPerPage: 0,
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
        albumsPerPage: payload.albumsPerPage,
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
        itemsPerPage: payload.itemsPerPage,
        loading: false
      };
    case GET_ALBUM_PHOTOS_NOPAG:
      return {
        ...state,
        photos: payload.albumPhotos,
        album: payload.album,
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
