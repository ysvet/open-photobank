import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Head from '../../../components/Head/Head';

import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <Fragment>
      <Head title={'NOT FOUND'} />
      <div className={styles.Container}>
        <hgroup>
          <h1>404</h1>
          <h2>not found</h2>
        </hgroup>
        <Link to='/' className={styles.ErrorHome}>
          Home
        </Link>
      </div>
    </Fragment>
  );
};

export default NotFound;
