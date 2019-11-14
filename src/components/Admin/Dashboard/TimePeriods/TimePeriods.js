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
import { getAllPeriods, deletePeriod } from '../../../../store/actions/period';

const TimePeriods = ({
  getAllPeriods,
  deletePeriod,
  period: { periods, loading }
}) => {
  useEffect(() => {
    getAllPeriods();
  }, [getAllPeriods]);

  const deletePeriodHandler = id => {
    confirmAlert({
      title: 'Confirm to delete period',
      message: 'Are you sure to delete this period?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deletePeriod(id)
        },
        {
          label: 'No'
          // onClick: () => onClose()
        }
      ]
    });
  };

  const periodsArray = periods.map(period => (
    <tr key={period.periodID}>
      <td className={styles.HideSm}>
        <Link to={`/time-periods/${period.periodID}`}>{period.periodID}</Link>
      </td>
      <td>
        <Link to={`/time-periods/${period.periodID}`}>
          {period.periodName}{' '}
        </Link>
      </td>
      <td>
        <Link to={`/adm/edit-period/${period.periodID}`}>
          <button className={`${styles.Btn} ${styles.BtnEdit}`}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link>
      </td>
      <td>
        <button
          onClick={() => deletePeriodHandler(period.periodID)}
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
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Time periods
        </h2>
        <div className={styles.DashButtons}>
          <Link to='/adm' className={`${styles.Btn} ${styles.BtnLight}`}>
            Back to Dashboard
          </Link>
          <Link
            to='/adm/add-period'
            className={`${styles.Btn} ${styles.BtnDark}`}
          >
            {' '}
            Add time period
          </Link>
        </div>

        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {periods.length > 0 ? (
                <Fragment>
                  <table className={`${styles.Table} ${styles.My2}`}>
                    <thead>
                      <tr>
                        <th className={styles.HideSm}>ID</th>
                        <th>Period</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>{periodsArray}</tbody>
                  </table>
                </Fragment>
              ) : (
                <h4>No periods found...</h4>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

TimePeriods.propTypes = {
  getAllPeriods: PropTypes.func.isRequired,
  deletePeriod: PropTypes.func.isRequired,
  period: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  period: state.period
});

export default connect(
  mapStateToProps,
  { getAllPeriods, deletePeriod }
)(TimePeriods);
