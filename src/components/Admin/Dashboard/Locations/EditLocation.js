import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import Spinner from '../../../UI/Spinner/Spinner';
import styles from '../../Admin.module.css';
import {
  createLocation,
  getLocationById
} from '../../../../store/actions/location';
import useIsMounted from '../../../../utils/isMounted';

const EditLocation = ({
  createLocation,
  getLocationById,
  locationObj,
  loading,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    locationID: match.params.id,
    locationName: ''
  });

  const { locationName, locationID } = formData;
  //only get location by id when id changed
  useEffect(() => {
    getLocationById(locationID);
  }, [getLocationById]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && locationObj !== null) {
      const { locationID, locationName } = locationObj;
      setFormData({
        locationID,
        locationName
      });
    }
  }, [locationObj, isMounted, loading]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createLocation(formData, history, true);
  };

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Edit location
        </h2>
        <Fragment>
          {locationObj === null || loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <form className={styles.Form} onSubmit={e => onSubmit(e)}>
                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Location'
                    name='locationName'
                    value={locationName}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='LocationID'
                    name='locationID'
                    value={locationID}
                    onChange={e => onChange(e)}
                    disabled
                  />
                </div>
                <input
                  type='submit'
                  className={`${styles.Btn} ${styles.BtnPrimary} ${styles.My1}`}
                />
                <Link
                  className={`${styles.Btn} ${styles.BtnLight} ${styles.My1}`}
                  to='/adm/locations'
                >
                  Go Back
                </Link>
              </form>
            </Fragment>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

EditLocation.propTypes = {
  createLocation: PropTypes.func.isRequired,
  getLocationById: PropTypes.func.isRequired,
  // locationObj: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  locationObj: state.location.locationObj,
  loading: state.location.loading
});

export default connect(mapStateToProps, { createLocation, getLocationById })(
  withRouter(EditLocation)
);
