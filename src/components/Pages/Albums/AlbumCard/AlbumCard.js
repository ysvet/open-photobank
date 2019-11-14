import React, { Fragment } from 'react';

import styles from './AlbumCard.module.css';

const AlbumCard = ({ albumName }) => {
  const displayAlbumCard = (
    <div className={styles.AlbumCard}>
      <div className={styles.AlbumCardBody}>
        <div className={styles.AlbumCardText}>
          <h2>{albumName}</h2>
        </div>
      </div>
    </div>
  );

  return <Fragment>{displayAlbumCard}</Fragment>;
};

export default AlbumCard;
