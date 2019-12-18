import React, { useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import styles from '../../Admin.module.css';
import { createLocation } from '../../../../store/actions/location';

const AddLocation = ({
  createLocation,
  location: { locationObj, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    locationName: ''
  });

  const { locationName } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createLocation(formData, history);
  };

  return loading && locationObj === null ? (
    <Redirect to='/adm/locations' />
  ) : (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Add location
        </h2>
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
      </div>
    </Fragment>
  );
};

AddLocation.propTypes = {
  createLocation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps, { createLocation })(
  withRouter(AddLocation)
);
