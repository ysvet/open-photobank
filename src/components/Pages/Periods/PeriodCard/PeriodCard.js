import React, { Fragment } from 'react';

import styles from './PeriodCard.module.css';

const PeriodCard = ({ periodName }) => {
  const displayPeriodCard = (
    <div className={styles.PeriodCard}>
      <div className={styles.PeriodCardBody}>
        <div className={styles.PeriodCardText}>
          <h2>{periodName}</h2>
        </div>
      </div>
    </div>
  );

  return <Fragment>{displayPeriodCard}</Fragment>;
};

export default PeriodCard;
