import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import Spinner from '../../../UI/Spinner/Spinner';
import styles from '../../Admin.module.css';
import {
  getTimePeriodById,
  createTimePeriod
} from '../../../../store/actions/period';
import useIsMounted from '../../../../utils/isMounted';

const EditTimePeriod = ({
  period: { period, loading },
  createTimePeriod,
  getTimePeriodById,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    periodID: match.params.id,
    periodName: ''
  });

  const { periodName, periodID } = formData;
  //only get period by id when id changed
  useEffect(() => {
    getTimePeriodById(periodID);
  }, [getTimePeriodById]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && period !== null) {
      const { periodID, periodName } = period;
      setFormData({
        periodID,
        periodName
      });
    }
  }, [period, isMounted, loading]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createTimePeriod(formData, history, true);
  };

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Edit period
        </h2>
        <Fragment>
          {period === null || loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <form className={styles.Form} onSubmit={e => onSubmit(e)}>
                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Period name'
                    name='periodName'
                    value={periodName}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Period ID'
                    name='periodID'
                    value={periodID}
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
                  to='/adm/periods'
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

EditTimePeriod.propTypes = {
  createTimePeriod: PropTypes.func.isRequired,
  getTimePeriodById: PropTypes.func.isRequired,
  period: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  period: state.period
});

export default connect(
  mapStateToProps,
  { createTimePeriod, getTimePeriodById }
)(withRouter(EditTimePeriod));
