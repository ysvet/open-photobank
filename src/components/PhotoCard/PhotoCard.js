import React, { Fragment } from 'react';

import PhotoCardCaption from './PhotoCardCaption/PhotoCardCaption';
import styles from './PhotoCard.module.css';

const PhotoCard = ({ title, src, category }) => {
  const card = (
    <div className={styles.PhotoCard}>
      <div className={styles.ThumbContainer}>
        <img alt={title} src={src} className={styles.CardThumb} />
      </div>

      <PhotoCardCaption title={title} categoryTitle={category} />
    </div>
  );

  return <Fragment>{card}</Fragment>;
};

export default PhotoCard;
