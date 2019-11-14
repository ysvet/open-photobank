import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useIsMounted from '../../../utils/isMounted';

import Pagination from '../../Navigation/Pagination/Pagination';
import Head from '../../Head/Head';
import Spinner from '../../UI/Spinner/Spinner';
import TitleBlock from '../../TitleBlock/TitleBlock';
import styles from './Albums.module.css';

import AlbumCard from './AlbumCard/AlbumCard';
import { getAllAlbums } from '../../../store/actions/album';

const Albums = ({
  getAllAlbums,
  album: {
    albums,
    totalAlbums,
    currentPage,
    hasNextPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    previousPage,
    loading
  },
  location
}) => {
  const [albumsData, setAlbumsData] = useState({
    totalAlbums: 0,
    currentPage: null,
    hasNextPage: null,
    nextPage: null,
    lastPage: null,
    hasPreviousPage: null,
    previousPage: null
  });

  const UrlQueryStrings = location.search;
  const queryValues = queryString.parse(UrlQueryStrings);
  const pageNow = queryValues.page;

  useEffect(() => {
    getAllAlbums(pageNow);
  }, [getAllAlbums]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && albums !== null) {
      setAlbumsData(albumsData);
    }
  }, [albums, isMounted, loading]);

  let photoAlbumsCards = albums.map(album => (
    <Link key={album.albumID} to={{ pathname: `/albums/${album.albumID}` }}>
      <AlbumCard albumName={album.albumName} />
    </Link>
  ));

  const getPhotosHadler = pageNum => getAllAlbums(pageNum);

  const albumsPage = (
    <Fragment>
      <Head title='Albums' content='open photobank' />
      <div className={styles.Container}>
        <TitleBlock pageTitle={'Albums'} />
        {loading && <Spinner />}
        {!loading && (
          <Fragment>
            <div className={styles.Albums}>{photoAlbumsCards}</div>
          </Fragment>
        )}
        <div className={styles.WhiteLine}>{''}</div>
        <Pagination
          totalPhotos={totalAlbums}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          nextPage={nextPage}
          lastPage={lastPage}
          hasPreviousPage={hasPreviousPage}
          previousPage={previousPage}
          getPhotosHadler={getPhotosHadler}
        />
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {albums === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>{albumsPage}</Fragment>
      )}
    </Fragment>
  );
};

Albums.propTypes = {
  getAllAlbums: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    album: state.album
  };
};

export default connect(mapStateToProps, { getAllAlbums })(Albums);
