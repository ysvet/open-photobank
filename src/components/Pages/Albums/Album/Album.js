import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useIsMounted from '../../../../utils/isMounted';

import Pagination from '../../../Navigation/Pagination/Pagination';

import Head from '../../../Head/Head';
import Spinner from '../../../UI/Spinner/Spinner';
import TitleBlock from '../../../TitleBlock/TitleBlock';
import PhotoCard from '../../../PhotoCard/PhotoCard';
import styles from './Album.module.css';
import { getAlbumPhotos } from '../../../../store/actions/album';

const Album = ({
  album: {
    album,
    totalPhotos,
    currentPage,
    hasNextPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    previousPage,
    loading
  },
  photos,
  getAlbumPhotos,
  match,
  location,
  lang
}) => {
  const [formData, setFormData] = useState({
    albumID: match.params.id,
    albumName: ''
  });
  const { albumName, albumID } = formData;

  const [photosData, setPhotosData] = useState({
    totalPhotos: 0,
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
    getAlbumPhotos(match.params.id, pageNow);
  }, [getAlbumPhotos]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && album !== null) {
      const { albumID, albumName } = album;
      setFormData({
        albumID,
        albumName
      });
      setPhotosData(photosData);
    }
  }, [album, isMounted, loading]);

  let photoCards = photos.map(photo => (
    <div className={styles.SlideCard} key={photo.photoID}>
      <Link to={`/photos/${photo.photoID}`}>
        <PhotoCard
          title={photo.title}
          category={photo.categoryName}
          src={`../uploads/thumbs/${photo.photoFileName}`}
        />
      </Link>
    </div>
  ));

  const getPhotosHadler = pageNum => getAlbumPhotos(match.params.id, pageNum);
  const comeFrom = location.search;

  const showAlbum = (
    <Fragment>
      <Head title={albumName} content='open photobank' />
      <div className={styles.Container}>
        {comeFrom && comeFrom.length === 0 && (
          <TitleBlock pageTitle={albumName} />
        )}
        {(comeFrom.length !== 0 || !loading || albumID === match.params.id) && (
          <TitleBlock pageTitle={albumName} />
        )}
        {(loading || albumID === match.params.id) && <Spinner />}
        {(!loading || albumID === match.params.id) && (
          <Fragment>
            <div className={styles.Album}>{photoCards}</div>
          </Fragment>
        )}
        <div className={styles.WhiteLine}>{''}</div>
        <Pagination
          totalPhotos={totalPhotos}
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

  return <Fragment>{showAlbum}</Fragment>;
};

Album.propTypes = {
  getAlbumPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  album: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  album: state.album,
  photos: state.album.photos
});

export default connect(mapStateToProps, { getAlbumPhotos })(Album);
