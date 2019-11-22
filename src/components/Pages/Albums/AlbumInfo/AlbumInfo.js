import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import styles from './AlbumInfo.module.css';

const AlbumInfo = ({ albumInfo }) => {
  return (
    <div className={styles.AlbumInfo}>
      <span>{ReactHtmlParser(albumInfo)}</span>
    </div>
  );
};
export default AlbumInfo;
