import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faImage,
  faImages,
  faListAlt,
  faMapMarkerAlt,
  faHistory,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

const DashboardActions = ({
  photos,
  categories,
  locations,
  albums,
  contributors
}) => {
  return (
    <div className={`${styles.DashNav} ${styles.DashButtons}`}>
      <div className={styles.BtnLine}>
        <Link
          to='/adm/general'
          className={`${styles.BtnDash} ${styles.BtnDark}`}
        >
          <FontAwesomeIcon icon={faCog} /> Settings
        </Link>
        <span
          className={`${styles.Btn} ${styles.BtnLight} ${styles.BtnStat} ${styles.HideSm}`}
        >
          {''}
        </span>
      </div>
      <div className={styles.BtnLine}>
        <Link
          to='/adm/photos'
          className={`${styles.BtnDash}  ${styles.BtnDark}`}
        >
          <FontAwesomeIcon icon={faImage} /> Photos
        </Link>
        <span
          className={`${styles.Btn} ${styles.BtnLight} ${styles.BtnStat}  ${styles.HideSm}`}
        >
          {photos}
        </span>
      </div>
      <div className={styles.BtnLine}>
        <Link
          to='/adm/albums'
          className={`${styles.BtnDash}  ${styles.BtnDark}`}
        >
          <FontAwesomeIcon icon={faImages} /> Albums
        </Link>{' '}
        <span
          className={`${styles.Btn} ${styles.BtnLight} ${styles.BtnStat}  ${styles.HideSm}`}
        >
          {albums}
        </span>
      </div>
      <div className={styles.BtnLine}>
        <Link
          to='/adm/categories'
          className={`${styles.BtnDash}  ${styles.BtnDark}`}
        >
          <FontAwesomeIcon icon={faListAlt} /> Categories
        </Link>{' '}
        <span
          className={`${styles.Btn} ${styles.BtnLight}  ${styles.BtnStat}  ${styles.HideSm}`}
        >
          {categories.length}
        </span>
      </div>
      <div className={styles.BtnLine}>
        <Link
          to='/adm/locations'
          className={`${styles.BtnDash} ${styles.BtnDark}`}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Locations
        </Link>{' '}
        <span
          className={`${styles.Btn} ${styles.BtnLight}  ${styles.BtnStat} ${styles.HideSm}`}
        >
          {locations.length}
        </span>
      </div>
      <div className={styles.BtnLine}>
        <Link
          to='/adm/periods'
          className={`${styles.BtnDash}  ${styles.BtnDark}`}
        >
          <FontAwesomeIcon icon={faHistory} /> Time periods
        </Link>{' '}
        <span
          className={`${styles.Btn} ${styles.BtnLight}  ${styles.BtnStat} ${styles.HideSm}`}
        >
          {''}
        </span>
      </div>
      <div className={styles.BtnLine}>
        <Link
          to='/adm/contributors'
          className={`${styles.BtnDash}  ${styles.BtnDark}`}
        >
          <FontAwesomeIcon icon={faUserPlus} /> Contributors
        </Link>{' '}
        <span
          className={`${styles.Btn} ${styles.BtnLight}  ${styles.BtnStat} ${styles.HideSm}`}
        >
          {contributors.length}
        </span>
      </div>
    </div>
  );
};

export default DashboardActions;
