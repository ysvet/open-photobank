import React from 'react';

import styles from './PhotoCardCaption.module.css';

const PhotoCardCaption = ({ title, categoryTitle }) => {
  let showTitle = '';
  title && title.length > 32
    ? (showTitle = title.slice(0, 32) + '...')
    : (showTitle = title);

  return (
    <div className={styles.PhotoCardCaption}>
      <div>
        <h3>{showTitle}</h3>
      </div>
      {/* <hr /> */}
      <div>
        <p>{categoryTitle}</p>
      </div>
    </div>
  );
};

export default PhotoCardCaption;
