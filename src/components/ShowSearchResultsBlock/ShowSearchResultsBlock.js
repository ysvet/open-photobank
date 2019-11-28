import React, { useState, useEffect, Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../Head/Head';
import Spinner from '../UI/Spinner/Spinner';
import TitleBlock from '../TitleBlock/TitleBlock';

import PhotoCard from '../../components/PhotoCard/PhotoCard';
import SearchBar from '../UI/SearchBar/SearchBar';
import styles from './ShowSearchResultsBlock.module.css';
import { searchPhotos, clearSearch } from '../../store/actions/search';

const ShowSearchResultsBlock = ({
  searchPhotos,
  clearSearch,
  search: { photos, loading }
}) => {
  const [searchData, setSearchField] = useState({
    q: ''
  });

  const q = searchData.q;

  const onSearchChange = event => {
    setSearchField({ q: event.target.value });
  };

  useEffect(() => {
    clearSearch();
  }, [clearSearch]);

  const onRunSearch = e => {
    e.preventDefault();
    searchPhotos(q);
  };

  let displaySearch = null;

  displaySearch = photos.map(photo => (
    <div className={styles.SlideCard} key={photo.photoID}>
      <Link to={`/photos/${photo.photoID}`}>
        <PhotoCard
          title={photo.title}
          cardInfo={photo.locationName}
          src={`../uploads/thumbs/${photo.photoFileName}`}
        />
      </Link>
    </div>
  ));

  if (photos[0] === 0) {
    displaySearch = null;
  }

  const displaySearchPage = (
    <Fragment>
      <Head title='Search' content='open free photobank' />

      <div className={styles.Container}>
        <SearchBar searchChange={onSearchChange} runSearch={onRunSearch} />
        <Fragment>
          <TitleBlock pageTitle={'Search results'} />
        </Fragment>
        <div className={styles.ShowCards}>
          {loading && photos[0] !== 0 ? (
            <Spinner />
          ) : photos.length === 0 ? (
            <Fragment>Nothing was found...</Fragment>
          ) : (
            <Fragment>{displaySearch}</Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );

  return <Fragment>{displaySearchPage}</Fragment>;
};

ShowSearchResultsBlock.propTypes = {
  searchPhotos: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

export default connect(mapStateToProps, { searchPhotos, clearSearch })(
  ShowSearchResultsBlock
);
