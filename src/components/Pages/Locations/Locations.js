import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Head from '../../Head/Head';
import TitleBlock from '../../TitleBlock/TitleBlock';
import Spinner from '../../UI/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { getAllLocations } from '../../../store/actions/location';

import styles from './Locations.module.css';

const Locations = ({ getAllLocations, location: { locations, loading } }) => {
  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? locations
    : locations.filter(loc =>
        loc.locationName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  let photoLocation = results.map(location => (
    <li key={location.locationID}>
      <h2>
        <Link to={{ pathname: `/locations/${location.locationID}` }}>
          <FontAwesomeIcon icon={faMinus} className={styles.Icon} /> {''}{' '}
          {location.locationName}
        </Link>
      </h2>
    </li>
  ));

  let searchbox = (
    <input
      type='text'
      placeholder='Search places'
      spellCheck='false'
      value={searchTerm}
      onChange={handleChange}
      className={styles.SearchBar}
    />
  );

  const locationsPage = (
    <Fragment>
      <Head title='Locations' content='Locations' />
      <div className={styles.Container}>
        <Fragment>
          <TitleBlock pageTitle={'Locations'} />
        </Fragment>
        <Fragment>{searchbox}</Fragment>
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
