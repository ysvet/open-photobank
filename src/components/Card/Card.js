import React from 'react';

import styles from './Card.module.css';

const Card = ({ lang, imgLink, cardTitle, cardText }) => {
  return (
    <div className={styles.ImgBox}>
      <img src={imgLink} alt={cardTitle} />
      <div className={styles.TransparentBox}>
        <div className={styles.Caption}>
          <h2>{cardTitle}</h2>
          <p className={styles.OpacityLow}>{cardText}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
