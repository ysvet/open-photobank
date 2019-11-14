import React, { Fragment } from 'react';

import styles from './LocationCard.module.css';

const LocationCard = ({ locationName }) => {
  const displayLocationCard = (
    <div className={styles.LocCard}>
      <div className={styles.LocCardBody}>
        <div className={styles.LocCardText}>
          <h2>{locationName}</h2>
        </div>
      </div>
    </div>
  );

  return <Fragment>{displayLocationCard}</Fragment>;
};

export default LocationCard;
