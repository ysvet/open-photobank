import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faImages,
  faListAlt,
  faMapMarkerAlt,
  faHistory,
  faSearch,
  faInfo
} from '@fortawesome/free-solid-svg-icons';

import styles from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = () => {
  const navBar = (
    <ul className={styles.NavigationItems}>
      <NavigationItem link='/' exact>
        <FontAwesomeIcon icon={faHome} />{' '}
        <span className={styles.HideSm}> Home </span>
      </NavigationItem>
      <NavigationItem link='/categories'>
        {' '}
        <FontAwesomeIcon icon={faListAlt} />{' '}
        <span className={styles.HideSm}>Categories</span>
      </NavigationItem>
      <NavigationItem link='/locations'>
        {' '}
        <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
        <span className={styles.HideSm}> Locations</span>
      </NavigationItem>
      <NavigationItem link='/albums'>
        <FontAwesomeIcon icon={faImages} />{' '}
        <span className={styles.HideSm}> Albums</span>
      </NavigationItem>
      <NavigationItem link='/time-periods'>
        <FontAwesomeIcon icon={faHistory} />{' '}
        <span className={styles.HideSm}>Periods</span>
      </NavigationItem>
      <NavigationItem link='/about'>
        <FontAwesomeIcon icon={faInfo} />{' '}
        <span className={styles.HideSm}> About</span>
      </NavigationItem>
      <NavigationItem link='/search'>
        <FontAwesomeIcon icon={faSearch} />{' '}
        <span className={styles.HideSm}>Search</span>
      </NavigationItem>
    </ul>
  );

  return <div>{navBar}</div>;
};

export default navigationItems;
