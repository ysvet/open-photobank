import React, { Fragment } from 'react';

import styles from './Description.module.css';

const Description = ({ description }) => {
  return (
    <div className={styles.Description}>
      <Fragment>
        <span>{description}</span>
        <hr />
      </Fragment>
    </div>
  );
};

export default Description;
