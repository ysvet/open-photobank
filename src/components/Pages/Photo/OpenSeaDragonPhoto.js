import React, { useEffect } from 'react';
import OpenSeadragon from 'openseadragon';

import styles from './Photo.module.css';

const OpenSeaDragonPhoto = ({ photoFileName }) => {
  if (photoFileName !== '') {
    useEffect(() => {
      initOpenseadragon(photoFileName);
    }, [photoFileName]);
  }

  const initOpenseadragon = photoFileName => {
    OpenSeadragon({
      id: 'viewer',
      tileSources: `/uploads/tiles/${photoFileName}.dzi`,
      prefixUrl: '/images/osd/',
      showZoomControl: true,
      showHomeControl: true,
      showFullPageControl: true,
      showRotationControl: true
    });
  };

  return <div id='viewer' className={styles.Viewer} />;
};

export default OpenSeaDragonPhoto;
