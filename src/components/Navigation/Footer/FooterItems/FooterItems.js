import React from 'react';

import styles from './FooterItems.module.css';
import FooterItem from '../FooterItem/FooterItem';

const footerItems = () => {
  const footer = (
    <ul className={styles.FooterItems}>
      <FooterItem link='/terms'>Terms of Use</FooterItem>
      <FooterItem link='/contributors'>Contributors</FooterItem>
    </ul>
  );

  return <div> {footer}</div>;
};

export default footerItems;
