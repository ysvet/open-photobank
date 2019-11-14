import React, { useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import styles from '../../Admin.module.css';
import { createTimePeriod } from '../../../../store/actions/period';

const AddTimePeriod = ({
  createTimePeriod,
  period: { period, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    periodName: ''
  });

  const { periodName } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createTimePeriod(formData, history);
  };

  return loading && period === null ? (
    <Redirect to='/adm/periods' />
  ) : (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Add time period
        </h2>
        <Fragment>
          <form className={styles.Form} onSubmit={e => onSubmit(e)}>
            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Time period'
                name='periodName'
                value={periodName}
                onChange={e => onChange(e)}
              />
            </div>
            <input
              type='submit'
              className={`${styles.Btn} ${styles.BtnPrimary} ${styles.My1}`}
            />
            <Link
              className={`${styles.Btn} ${styles.BtnLight} ${styles.My1}`}
              to='/adm/periods'
            >
              Go Back
            </Link>
          </form>
        </Fragment>
      </div>
    </Fragment>
  );
};

AddTimePeriod.propTypes = {
  createTimePeriod: PropTypes.func.isRequired,
  period: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  period: state.period
});

export default connect(
  mapStateToProps,
  { createTimePeriod }
)(withRouter(AddTimePeriod));
