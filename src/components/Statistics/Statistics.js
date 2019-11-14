import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../UI/Spinner/Spinner';

import { getAllAlbums } from '../../store/actions/album';
import { getAllCategories } from '../../store/actions/category';
import { getAllPhotos } from '../../store/actions/photo';
import { getAllLocations } from '../../store/actions/location';

import styles from './Statistics.module.css';

const Statistics = ({
  albums,
  photos,
  categories,
  locations,
  loading,
  getAllAlbums,
  getAllCategories,
  getAllLocations,
  getAllPhotos
}) => {
  useEffect(() => {
    getAllAlbums();
    getAllCategories();
    getAllPhotos();
    getAllLocations();
  }, [getAllAlbums, getAllLocations, getAllPhotos, getAllCategories]);
  return loading ? (
    <Spinner />
  ) : (
    <div className={styles.Statistics}>
      <h4>Photobank: </h4>{' '}
      <span>
        {' '}
        <h4>
          <Link to='/latest'>Photos:</Link> {photos.totalPhotos}
        </h4>
      </span>{' '}
      <span>
        {' '}
        <h4>
          <Link to='/albums'>Albums:</Link> {albums.totalAlbums}
        </h4>
      </span>{' '}
      <span>
        {' '}
        <h4>
          <Link to='/categories'>Categories: </Link>
          {categories.length}
        </h4>
      </span>{' '}
      <span>
        {' '}
        <h4>
          <Link to='/locations'>Locations:</Link> {locations.length}
        </h4>
      </span>
    </div>
  );
};

Statistics.propTypes = {
  getAllAlbums: PropTypes.func.isRequired,
  getAllPhotos: PropTypes.func.isRequired,
  getAllLocations: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  albums: PropTypes.object.isRequired,
  photos: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    albums: state.album,
    photos: state.photo,
    locations: state.location.locations,
    categories: state.category.categories,
    loading: state.album.loading
  };
};

export default connect(mapStateToProps, {
  getAllAlbums,
  getAllPhotos,
  getAllLocations,
  getAllCategories
})(Statistics);
