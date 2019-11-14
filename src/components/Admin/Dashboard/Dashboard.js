import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';
import Navbar from '../Navbar/Navbar';
import DashboardActions from './DashboardActions';
import { getAllAlbums } from '../../../store/actions/album';
import { getAllCategories } from '../../../store/actions/category';
import { getAllPhotos } from '../../../store/actions/photo';
import { getAllLocations } from '../../../store/actions/location';
import { getAllContributors } from '../../../store/actions/contributor';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

import styles from '../Admin.module.css';

const Dashboard = ({
  isAuthenticated,
  albums,
  photos,
  categories,
  locations,
  loading,
  contributors,
  getAllAlbums,
  getAllCategories,
  getAllLocations,
  getAllPhotos,
  getAllContributors
}) => {
  //Redirect if not loged in
  if (!isAuthenticated) {
    return <Redirect to='/adm/login' />;
  }
  useEffect(() => {
    getAllAlbums();
    getAllCategories();
    getAllPhotos();
    getAllLocations();
    getAllContributors();
  }, [
    getAllAlbums,
    getAllLocations,
    getAllPhotos,
    getAllCategories,
    getAllContributors
  ]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Fragment>
          <h1 className={`${styles.Large} ${styles.TextPrimary}`}>Dashboard</h1>

          <div className={styles.DashInnerContainer}>
            <DashboardActions
              photos={photos.totalPhotos}
              locations={locations}
              contributors={contributors}
              albums={albums.totalAlbums}
              categories={categories}
            />
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  getAllAlbums: PropTypes.func.isRequired,
  getAllPhotos: PropTypes.func.isRequired,
  getAllLocations: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  getAllContributors: PropTypes.func.isRequired,
  albums: PropTypes.object.isRequired,
  photos: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  contributors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  isAuthenticated: state.auth.isAuthenticated,
  albums: state.album,
  photos: state.photo,
  locations: state.location.locations,
  categories: state.category.categories,
  contributors: state.contributor.contributors,
  loading: state.album.loading
});

export default connect(
  mapStateToProps,
  {
    getAllAlbums,
    getAllPhotos,
    getAllLocations,
    getAllCategories,
    getAllContributors
  }
)(Dashboard);
