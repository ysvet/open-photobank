import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './PhotoDownload.module.css';

const PhotoDownload = ({ photoSize }) => {
  return (
    <div className={styles.PhotoDownload}>
      <div className={styles.IconPhotoDownload}>
        <FontAwesomeIcon icon={faArrowAltCircleDown} size='3x' />
      </div>
      <div>
        <h3>Download image</h3>
        {photoSize === 'NaN undefined' ? null : <h4>{photoSize}</h4>}
      </div>
    </div>
  );
};

export default PhotoDownload;
