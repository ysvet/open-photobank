import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchChange, runSearch }) => {
  const displaySearchBar = (
    <Fragment>
      <form onSubmit={e => runSearch(e)} className={styles.SearchBar}>
        <input
          type='text'
          spellCheck='false'
          className={styles.SearchTerm}
          placeholder='Searching in titles and descriptions...'
          onChange={e => searchChange(e)}
        />
        <button
          type='submit'
          className={styles.SearchButton}
          onClick={e => runSearch(e)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </Fragment>
  );

  return <div>{displaySearchBar}</div>;
};

export default SearchBar;
