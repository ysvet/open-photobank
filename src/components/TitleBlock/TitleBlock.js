import React from 'react';

import styles from './TitleBlock.module.css';

const TitleBlock = ({ pageTitle }) => {
  return (
    <div className={styles.PageTitle}>
      <span>{pageTitle}</span>
      <hr />
    </div>
  );
};

export default TitleBlock;
