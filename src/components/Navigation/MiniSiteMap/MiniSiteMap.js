import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './MiniSiteMap.module.css';

const MiniSiteMap = ({
  catLink,
  catName,
  perLink,
  perName,
  locLink,
  locName,
  albLink,
  albName,
  exact
}) => {
  let catalogItemCategory = null;
  let catalogItemLocation = null;
  let catalogItemPeriod = null;
  let catalogItemAlbum = null;

  let showAlbName = null;

  albName && albName.length > 25
    ? (showAlbName = albName.slice(0, 25) + '...')
    : (showAlbName = albName);

  catalogItemCategory = (
    <div className={styles.MapElement}>
      <span>
        <NavLink to={catLink} exact={exact}>
          {' '}
          {catName}
        </NavLink>
      </span>
    </div>
  );

  catalogItemLocation = (
    <div className={styles.MapElement}>
      <span>
        <NavLink to={locLink} exact={exact}>
          {' '}
          {locName}
        </NavLink>
      </span>
    </div>
  );

  catalogItemAlbum = (
    <div className={styles.MapElement}>
      <span>
        <NavLink to={albLink} exact={exact}>
          {' '}
          {showAlbName}
        </NavLink>
      </span>
    </div>
  );

  catalogItemPeriod = (
    <div className={styles.MapElement}>
      <span>
        <NavLink to={perLink} exact={exact}>
          {' '}
          {perName}
        </NavLink>
      </span>
    </div>
  );

  return (
    <div className={styles.MiniSiteMap}>
      {catLink ? <span> {catalogItemCategory} </span> : null}
      {locLink ? <span> {catalogItemLocation} </span> : null}
      {perLink ? <span> {catalogItemPeriod} </span> : null}
      {albLink ? <span> {catalogItemAlbum} </span> : null}
    </div>
  );
};

export default MiniSiteMap;
