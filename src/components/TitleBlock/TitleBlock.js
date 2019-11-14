import React from 'react';

import styles from './TitleBlock.module.css';

const TitleBlock = ({ pageTitle }) => {
  return (
    <div className={styles.PageTitle}>
      <h1>{pageTitle}</h1>
      <hr />
    </div>
  );
};

export default TitleBlock;
