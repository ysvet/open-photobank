import React from 'react';
import { Link } from 'react-router-dom';
import PhotoDownload from '../PhotoDownload/PhotoDownload';
import styles from './DownBlocks.module.css';

const DownBlocks = ({
  license,
  imgSize,
  photoFileName,
  title,
  contributorName
}) => {
  //function for converting fetched image size in bytes to KB and MB
  const formatBytes = (a, b) => {
    if (0 === a) return '0 Bytes';
    const c = 1024,
      d = b || 2,
      e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
  };

  const photoSize = formatBytes(imgSize, 2);

  let showLicense = '';
  if (license === 'Public Domain') {
    showLicense = '--Short license description--';
  } else if (license === 'Attribution (CC BY)') {
    showLicense = '--Short license description--';
  } else if (license === 'Attribution-NonCommercial (CC BY-NC)') {
    showLicense = '--Short license description--';
  }

  return (
    <div className={styles.DownBlocks}>
      <Link to={'/contribute'}>
        <div className={styles.DownBlockHelp}>
          <h4>Contribute</h4>
        </div>
      </Link>
      <div className={styles.DownBlockLicense}>
        <h5>{license}</h5>
        <h6>{showLicense}</h6>
      </div>
      <a
        href={`../uploads/${photoFileName}`}
        download={`openphotobank-${title.replace(
          /"/g,
          ''
        )}-${contributorName}-${new Date()
          .toISOString()
          .replace(/:/g, '-')}.jpg`}
        target='_self'
      >
        <div className={styles.DownBlock}>
          <PhotoDownload photoSize={photoSize} />
        </div>
      </a>
    </div>
  );
};

export default DownBlocks;
