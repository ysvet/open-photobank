import React, { Fragment, useEffect, useState, useRef } from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import styles from './Photo.module.css';

import Head from '../../Head/Head';
import NotFound from '../../Pages/NotFound/NotFound';
import Spinner from '../../UI/Spinner/Spinner';
import MiniSiteMap from '../../Navigation/MiniSiteMap/MiniSiteMap';
import DownBlocks from './DownBlocks/DownBlocks';
import AlbumNav from '../../Navigation/AlbumNav/AlbumNav';
import PhotoDescription from './PhotoDescription';
// import AlbumInfo from '../Albums/AlbumInfo/AlbumInfo';

import OpenSeadragonPhoto from './OpenSeaDragonPhoto';
import { getPhotoById } from '../../../store/actions/photo';
import { getAlbumPhotosNav } from '../../../store/actions/album';

const Photo = ({
  getPhotoById,
  getAlbumPhotosNav,
  albumPhotos,
  photo,
  loading,
  match,
  history
}) => {
  const [photoData, setPhotoData] = useState({
    photoID: match.params.id,
    photoFileName: '',
    title: '',
    description: '',
    albumID: '',
    albumName: '',
    albumInfo: '',
    categoryID: '',
    categoryName: '',
    categoryID2: '',
    categoryName2: '',
    categoryID3: '',
    categoryName3: '',
    locationID: '',
    locationName: '',
    contributorID: '',
    contributorName: '',
    contributorWeb: '',
    source: '',
    sourceWeb: '',
    author: '',
    periodID: '',
    periodName: '',
    license: '',
    imgSize: ''
  });

  const {
    photoID,
    photoFileName,
    title,
    description,
    albumID,
    albumName,
    albumInfo,
    categoryID,
    categoryName,
    categoryID2,
    categoryName2,
    categoryID3,
    categoryName3,
    locationID,
    locationName,
    contributorID,
    contributorName,
    source,
    sourceWeb,
    author,
    periodID,
    periodName,
    license,
    imgSize
  } = photoData;

  const getPhotoByIdRef = useRef();

  getPhotoByIdRef.current = getPhotoById;

  useEffect(() => {
    getPhotoByIdRef.current(photoID);
  }, [getPhotoByIdRef]);

  useEffect(() => {
    if (loading === false && photo !== null) {
      const {
        photoID,
        photoFileName,
        title,
        description,
        albumID,
        albumName,
        albumInfo,
        categoryID,
        categoryName,
        categoryID2,
        categoryName2,
        categoryID3,
        categoryName3,
        locationID,
        locationName,
        contributorID,
        contributorName,
        source,
        sourceWeb,
        author,
        periodID,
        periodName,
        license,
        imgSize
      } = photo;

      setPhotoData({
        photoID,
        photoFileName,
        title,
        description,
        albumID,
        albumName,
        albumInfo,
        categoryID,
        categoryName,
        categoryID2,
        categoryName2,
        categoryID3,
        categoryName3,
        locationID,
        locationName,
        contributorID,
        contributorName,
        source,
        sourceWeb,
        author,
        periodID,
        periodName,
        license,
        imgSize
      });
    }
  }, [loading, photo]);

  //preparing for navigation between photos in an album
  useEffect(() => {
    if (photo !== null && albumID) {
      getAlbumPhotosNav(albumID);
    }
  }, [getAlbumPhotosNav, albumID]);

  //showing tiles
  let showPhoto = null;

  if (+match.params.id === +photoID) {
    showPhoto = <OpenSeadragonPhoto photoFileName={photoFileName} />;
  } else {
    showPhoto = null;
  }

  return !photo ? (
    loading || +match.params.id === +photoID ? (
      <Spinner />
    ) : (
      <NotFound />
    )
  ) : (
    <Fragment>
      <Head title={title} content={description} />
      {+match.params.id === +photoID && (
        <MiniSiteMap
          history={history}
          catLink={`/categories/${categoryID}`}
          catName={categoryName}
          locLink={`/locations/${locationID}`}
          locName={locationName}
          albLink={`/albums/${albumID}`}
          albName={albumName}
          perLink={`/time-periods/${periodID}`}
          perName={periodName}
        />
      )}
      <div>
        <div className={styles.Caption}>
          {+match.params.id === +photoID && <h1>{title}</h1>}
        </div>
        <div className={styles.Container}>
          <div className={styles.PhotoPage}>
            {loading ? (
              <Spinner />
            ) : (
              <Fragment>
                {showPhoto}
                {albumID && (
                  <AlbumNav albumPhotos={albumPhotos} photoID={photoID} />
                )}
              </Fragment>
            )}
            <div className={styles.PhotoDescription}>
              {loading ? (
                <Spinner />
              ) : (
                <PhotoDescription
                  photoID={photoID}
                  title={title}
                  categoryName={categoryName}
                  categoryName2={categoryName2}
                  categoryName3={categoryName3}
                  categoryID={categoryID}
                  categoryID2={categoryID2}
                  categoryID3={categoryID3}
                  contributorName={contributorName}
                  albumID={albumID}
                  albumName={albumName}
                  contributorID={contributorID}
                  periodID={periodID}
                  periodName={periodName}
                  locationID={locationID}
                  locationName={locationName}
                  author={author}
                  source={source}
                  sourceWeb={sourceWeb}
                />
              )}
            </div>

            <div className={styles.PhotoDescriptionDescr}>
              {description ? (
                <Fragment>
                  {' '}
                  <span>{ReactHtmlParser(description)}</span>
                </Fragment>
              ) : null}
            </div>

            {albumInfo ? (
              <div className={styles.PhotoDescriptionDescr}>
                <Fragment>
                  {' '}
                  <span>{ReactHtmlParser(albumInfo)}</span>
                </Fragment>
              </div>
            ) : null}
            <DownBlocks
              license={license}
              photoFileName={photoFileName}
              imgSize={imgSize}
              title={title}
              contributorName={contributorName}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Photo.propTypes = {
  getPhotoById: PropTypes.func.isRequired,
  // photo: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    photo: state.photo.photo,
    loading: state.photo.loading,
    albumPhotos: state.album.photos
  };
};

export default connect(
  mapStateToProps,

  { getPhotoById, getAlbumPhotosNav }
)(Photo);
