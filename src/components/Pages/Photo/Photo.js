import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import styles from './Photo.module.css';

import Head from '../../Head/Head';
import NotFound from '../../Pages/NotFound/NotFound';
import Spinner from '../../UI/Spinner/Spinner';
import MiniSiteMap from '../../Navigation/MiniSiteMap/MiniSiteMap';
import PhotoDownload from './PhotoDownload/PhotoDownload';

import OpenSeadragonPhoto from './OpenSeaDragonPhoto';
import { getPhotoById } from '../../../store/actions/photo';

const Photo = ({ getPhotoById, photo, loading, match }) => {
  const [photoData, setPhotoData] = useState({
    photoID: match.params.id,
    photoFileName: '',
    title: '',
    description: '',
    albumID: '',
    albumName: '',
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

  let showPhoto = null;

  if (+match.params.id === +photoID) {
    showPhoto = <OpenSeadragonPhoto photoFileName={photoFileName} />;
  } else {
    showPhoto = null;
  }

  //function for converting fetched image size in bytes to KB and MB
  const formatBytes = (a, b) => {
    if (0 === a) return '0 Bytes';
    const c = 1024,
      d = b || 2,
      e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
  };

  const photoSize = formatBytes(imgSize, 2);
  let showLicense = '';

  if (license === 'Public Domain') {
    showLicense = '--Short license description--';
  } else if (license === 'Attribution (CC BY)') {
    showLicense = '--Short license description--';
  } else if (license === 'Attribution-NonCommercial (CC BY-NC)') {
    showLicense = '--Short license description--';
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
            {loading ? <Spinner /> : <Fragment>{showPhoto}</Fragment>}
            <div className={styles.PhotoDescription}>
              {loading ? (
                <Spinner />
              ) : (
                <Fragment>
                  <ul>
                    {photoID ? (
                      <li>
                        <strong>ID:</strong> {photoID}
                      </li>
                    ) : null}
                    {title ? (
                      <li>
                        <strong>Title:</strong> {title}
                      </li>
                    ) : null}

                    {categoryName ? (
                      <li>
                        <strong>Category</strong>:{' '}
                        <Link to={`/categories/${categoryID}`}>
                          {categoryName}{' '}
                        </Link>
                        {categoryName2 ? (
                          <span>
                            {' | '}
                            <Link to={`/categories/${categoryID2}`}>
                              {categoryName2}{' '}
                            </Link>
                          </span>
                        ) : null}
                        {categoryName3 ? (
                          <span>
                            {' | '}
                            <Link to={`/categories/${categoryID3}`}>
                              {categoryName3}{' '}
                            </Link>
                          </span>
                        ) : null}
                      </li>
                    ) : null}
                    {albumName ? (
                      <li>
                        <strong>Album:</strong>{' '}
                        <Link to={`/albums/${albumID}`}>{albumName} </Link>
                      </li>
                    ) : null}
                    {locationName ? (
                      <li>
                        <strong>Location:</strong>{' '}
                        <Link to={`/locations/${locationID}`}>
                          {locationName}{' '}
                        </Link>
                      </li>
                    ) : null}
                    {contributorName ? (
                      <li>
                        <strong>Contributor:</strong>{' '}
                        <Link to={`/contributors/${contributorID}`}>
                          {contributorName}{' '}
                        </Link>
                      </li>
                    ) : null}
                    {periodName ? (
                      <li>
                        <strong>Time period:</strong>{' '}
                        <Link to={`/time-periods/${periodID}`}>
                          {periodName}{' '}
                        </Link>
                      </li>
                    ) : null}
                    {source ? (
                      <li>
                        <strong>Source:</strong>
                        {source}
                        {sourceWeb ? (
                          <span>
                            {' | '}
                            <a
                              target='_blank'
                              rel='noopener noreferrer nofollow'
                              href={`${sourceWeb}`}
                            >
                              {sourceWeb}{' '}
                            </a>
                          </span>
                        ) : null}
                      </li>
                    ) : null}
                    {author ? (
                      <li>
                        <strong>Author:</strong> {author}
                      </li>
                    ) : null}
                  </ul>
                </Fragment>
              )}
            </div>

            <div className={styles.PhotoDescriptionDescr}>
              {description ? (
                <Fragment> {ReactHtmlParser(description)}</Fragment>
              ) : null}
            </div>

            <div className={styles.DownBlocks}>
              <Link to={'/contribute'}>
                <div className={styles.DownBlockHelp}>
                  <h4>Contribute</h4>
                </div>
              </Link>
              <div className={styles.DownBlockLicense}>
                <h5>{license}</h5>
                <h6>{showLicense}</h6>
              </div>
              <a
                href={`../uploads/${photoFileName}`}
                download={`openphotobank-${title.replace(
                  /"/g,
                  ''
                )}-${contributorName}-${new Date()
                  .toISOString()
                  .replace(/:/g, '-')}.jpg`}
                target='_self'
              >
                <div className={styles.DownBlock}>
                  <PhotoDownload photoSize={photoSize} />
                </div>
              </a>
            </div>
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
    loading: state.photo.loading
  };
};

export default connect(mapStateToProps, { getPhotoById })(Photo);
