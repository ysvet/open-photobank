import React from 'react';

import styles from './TitleBlock.module.css';

const TitleBlock = ({ pageTitle, addInfo }) => {
  return !addInfo ? (
    <div className={styles.PageTitle}>
      <span className={styles.PageTitleSpan}>{pageTitle}</span>

      <hr />
    </div>
  ) : (
    <div className={styles.PageTitle}>
      <span className={styles.PageTitleSpan}>{pageTitle} </span>
      <span className={styles.AddInfoSpan}>{addInfo}</span>
      <hr />
    </div>
  );
};

export default TitleBlock;
