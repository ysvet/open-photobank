import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Head from '../../Head/Head';
import Spinner from '../../UI/Spinner/Spinner';
import TitleBlock from '../../TitleBlock/TitleBlock';
import PeriodCard from './PeriodCard/PeriodCard';
import { getAllPeriods } from '../../../store/actions/period';

import styles from './Periods.module.css';

const Periods = ({ getAllPeriods, period: { periods, loading } }) => {
  useEffect(() => {
    getAllPeriods();
  }, [getAllPeriods]);

  let photoPeriodsCards = periods.map(period => (
    <Link
      key={period.periodID}
      to={{ pathname: `/time-periods/${period.periodID}` }}
    >
      <PeriodCard periodName={period.periodName} />
    </Link>
  ));

  const periodsPage = (
    <Fragment>
      <Head title='Time periods' content='Time periods' />
      <div className={styles.Container}>
        <TitleBlock pageTitle={'Time periods'} />
        <div>
          <div className={styles.Periods}>{photoPeriodsCards}</div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {periods === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>{periodsPage}</Fragment>
      )}
    </Fragment>
  );
};

Periods.propTypes = {
  getAllPeriods: PropTypes.func.isRequired,
  period: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    period: state.period
  };
};

export default connect(mapStateToProps, { getAllPeriods })(Periods);
