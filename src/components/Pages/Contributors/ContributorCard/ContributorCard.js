import React, { Fragment } from 'react';

import styles from './ContributorCard.module.css';

const ContributorCard = ({ contrName, contrEmail, contrWeb }) => {
  const displayContribCard = (
    <div className={styles.ContrCard}>
      <div className={styles.ContrCardBody}>
        <div className={styles.ContrCardText}>
          <h2>{contrName}</h2>
          <h3>{contrEmail}</h3>
          <h4>{contrWeb}</h4>
        </div>
        <div></div>
      </div>
    </div>
  );

  return <Fragment>{displayContribCard}</Fragment>;
};

export default ContributorCard;
