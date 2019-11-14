import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Pagination.module.css';

const Pagination = ({
  totalPhotos,
  currentPage,
  hasNextPage,
  nextPage,
  lastPage,
  hasPreviousPage,
  previousPage,
  getPhotosHadler
}) => {
  return (
    <Fragment>
      <section className={styles.Pagination}>
        <div className={styles.WhiteLine}> {''} </div>
        {previousPage !== 1 && (
          <NavLink
            to={'?page=1'}
            onClick={() => getPhotosHadler(1)}
            exact
            activeClassName={styles.active}
          >
            {currentPage === 1 && <span className={styles.active}> 1</span>}
            {currentPage !== 1 && <span> 1</span>}
          </NavLink>
        )}

        {hasPreviousPage === true && (
          <div>
            <NavLink
              to={`?page=${previousPage}`}
              onClick={() => getPhotosHadler(previousPage)}
            >
              <span>{previousPage}</span>
            </NavLink>
            <NavLink to={`?page=${currentPage}`}>
              <span className={styles.active}> {currentPage}</span>
            </NavLink>
          </div>
        )}

        {hasNextPage === true && (
          <NavLink
            to={`?page=${nextPage}`}
            onClick={() => getPhotosHadler(nextPage)}
          >
            <span> {nextPage}</span>
          </NavLink>
        )}

        {lastPage !== currentPage && nextPage !== lastPage && (
          <NavLink
            to={`?page=${lastPage}`}
            onClick={() => getPhotosHadler(lastPage)}
          >
            <span>{lastPage}</span>
          </NavLink>
        )}
      </section>
    </Fragment>
  );
};

export default Pagination;
