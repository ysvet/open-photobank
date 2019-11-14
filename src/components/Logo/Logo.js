import React from 'react';

import bessarabicaLogo from '../../assets/images/logo.png';
import styles from './Logo.module.css';

const logo = ( props ) => (
   <div className={styles.Logo} style={{height: props.height}}>
     <img src={bessarabicaLogo} alt="bessarabica" />
   </div>
);

export default logo;