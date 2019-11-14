import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Head from '../../Head/Head';
import TitleBlock from '../../TitleBlock/TitleBlock';
import Spinner from '../../UI/Spinner/Spinner';
import { getAllLocations } from '../../../store/actions/location';

import styles from './Locations.module.css';

const Locations = ({ getAllLocations, location: { locations, loading } }) => {
  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);

  let photoLocation = locations.map(location => (
    <li key={location.locationID}>
      <h2>
        <Link to={{ pathname: `/locations/${location.locationID}` }}>
          {location.locationName}
        </Link>
      </h2>
    </li>
  ));

  const locationsPage = (
    <Fragment>
      <Head title='Locations' content='Locations' />
      <div className={styles.Container}>
        <Fragment>
          <TitleBlock pageTitle={'Locations'} />
        </Fragment>
        <div>
          <div className={styles.Locations}>{photoLocation}</div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {locations === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <ul>{locationsPage}</ul>
        </Fragment>
      )}
    </Fragment>
  );
};

Locations.propTypes = {
  getAllLocations: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    location: state.location
  };
};

export default connect(mapStateToProps, { getAllLocations })(Locations);
