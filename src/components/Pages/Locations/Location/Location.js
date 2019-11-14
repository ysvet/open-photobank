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
import { getLocationPhotos } from '../../../../store/actions/location';

import styles from './Location.module.css';

const Location = ({
  locationState: {
    locationObj,
    loading,
    totalPhotos,
    currentPage,
    hasNextPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    previousPage
  },
  photos,
  getLocationPhotos,
  match,
  location
}) => {
  const [formData, setFormData] = useState({
    locationID: match.params.id,
    locationName: ''
  });
  const { locationName, locationID } = formData;

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
    getLocationPhotos(match.params.id, pageNow);
  }, [getLocationPhotos]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && locationObj !== null) {
      const { locationID, locationName } = locationObj;
      setFormData({
        locationID,
        locationName
      });
      setPhotosData(photosData);
    }
  }, [locationObj, isMounted, loading]);

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

  const getPhotosHadler = pageNum =>
    getLocationPhotos(match.params.id, pageNum);
  const comeFrom = location.search;

  const showLocation = (
    <Fragment>
      <Head title={locationName} content={locationName} />
      <div className={styles.Container}>
        {comeFrom && comeFrom.length === 0 && (
          <TitleBlock pageTitle={locationName} />
        )}
        {(comeFrom.length !== 0 ||
          !loading ||
          locationID === match.params.id) && (
          <TitleBlock pageTitle={locationName} />
        )}
        {(loading || locationID === match.params.id) && <Spinner />}
        {(!loading || locationID === match.params.id) && (
          <Fragment>
            <div className={styles.Location}>{photoCards}</div>
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

  return <Fragment>{showLocation}</Fragment>;
};

Location.propTypes = {
  getLocationPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  locationState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  locationState: state.location,
  photos: state.location.photos
});

export default connect(mapStateToProps, { getLocationPhotos })(Location);
