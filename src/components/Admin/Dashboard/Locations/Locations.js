import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Admin.module.css';
import {
  getAllLocations,
  deleteLocation
} from '../../../../store/actions/location';

const Locations = ({
  getAllLocations,
  deleteLocation,
  location: { locations, loading }
}) => {
  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);

  const deleteLocationHandler = id => {
    confirmAlert({
      title: 'Confirm to delete location',
      message: 'Are you sure to delete this location?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteLocation(id)
        },
        {
          label: 'No'
          // onClick: () => onClose()
        }
      ]
    });
  };

  const locationsArray = locations.map(location => (
    <tr key={location.locationID}>
      <td className={styles.HideSm}>
        <Link to={`/locations/${location.locationID}`}>
          {location.locationID}
        </Link>
      </td>
      <td>
        <Link to={`/locations/${location.locationID}`}>
          {location.locationName}{' '}
        </Link>
      </td>
      <td>
        <Link to={`/adm/edit-location/${location.locationID}`}>
          <button className={`${styles.Btn} ${styles.BtnEdit}`}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link>
      </td>
      <td>
        <button
          onClick={() => deleteLocationHandler(location.locationID)}
          className={`${styles.Btn} ${styles.BtnDanger}`}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}> Locations</h2>
        <div className={styles.DashButtons}>
          <Link to='/adm' className={`${styles.Btn} ${styles.BtnLight}`}>
            Back to Dashboard
          </Link>
          <Link
            to='/adm/add-location'
            className={`${styles.Btn} ${styles.BtnDark}`}
          >
            Add location
          </Link>
        </div>

        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {locations.length > 0 ? (
                <Fragment>
                  <table className={`${styles.Table} ${styles.My2}`}>
                    <thead>
                      <tr>
                        <th className={styles.HideSm}>ID</th>
                        <th>Location</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>{locationsArray}</tbody>
                  </table>
                </Fragment>
              ) : (
                <h4>No locations found...</h4>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Locations.propTypes = {
  getAllLocations: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  location: state.location
});

export default connect(
  mapStateToProps,
  { getAllLocations, deleteLocation }
)(Locations);
