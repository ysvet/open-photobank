import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './PhotoDownload.module.css';

const PhotoDownload = () => {
  return (
    <div className={styles.PhotoDownload}>
      <div className={styles.IconPhotoDownload}>
        <FontAwesomeIcon icon={faArrowAltCircleDown} size='3x' />
      </div>
      <div>
        <h3>Download image</h3>
      </div>
    </div>
  );
};

export default PhotoDownload;
