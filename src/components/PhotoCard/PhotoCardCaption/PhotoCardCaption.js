import React from 'react';

import styles from './PhotoCardCaption.module.css';

const PhotoCardCaption = ({ title, cardInfo }) => {
  let showTitle = '';
  title && title.length > 32
    ? (showTitle = title.slice(0, 32) + '...')
    : (showTitle = title);

  let showInfo = '';
  cardInfo && cardInfo.length > 17
    ? (showInfo = cardInfo.slice(0, 17) + '...')
    : (showInfo = cardInfo);

  return (
    <div className={styles.PhotoCardCaption}>
      <div>
        <h3>{showTitle}</h3>
      </div>
      {/* <hr /> */}
      <div>
        <p>{showInfo}</p>
      </div>
    </div>
  );
};

export default PhotoCardCaption;
