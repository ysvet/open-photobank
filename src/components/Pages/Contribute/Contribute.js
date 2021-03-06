import React, { Fragment } from 'react';

import Head from '../../Head/Head';
import TitleBlock from '../../TitleBlock/TitleBlock';

import styles from './Contribute.module.css';

const Contribute = () => {
  return (
    <Fragment>
      <Head title='Contribute' content='Contribute' />
      <div className={styles.Container}>
        <Fragment>
          <TitleBlock pageTitle='Contribute' />
        </Fragment>

        <div className={styles.Contribute}>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque in dictum non consectetur a erat nam. Vel eros donec ac
            odio tempor orci dapibus. Ultrices eros in cursus turpis massa.
            Nulla porttitor massa id neque aliquam vestibulum. Nullam vehicula
            ipsum a arcu cursus vitae congue mauris. Viverra aliquet eget sit
            amet tellus cras adipiscing. Sed id semper risus in hendrerit
            gravida rutrum quisque. Ultrices dui sapien eget mi proin. Ut sem
            viverra aliquet eget sit amet tellus cras adipiscing. Pulvinar proin
            gravida hendrerit lectus a. Nascetur ridiculus mus mauris vitae
            ultricies leo integer. Feugiat scelerisque varius morbi enim nunc
            faucibus a pellentesque. Nunc congue nisi vitae suscipit tellus
            mauris a diam. Adipiscing elit ut aliquam purus. Nunc sed id semper
            risus in.
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Contribute;
