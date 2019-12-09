import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useIsMounted from '../../../../utils/isMounted';
import DropdownPeriod from '../../../Navigation/Dropdown/DropdownPeriod';

import Pagination from '../../../Navigation/Pagination/Pagination';
import Head from '../../../Head/Head';
import Spinner from '../../../UI/Spinner/Spinner';
import TitleBlock from '../../../TitleBlock/TitleBlock';
import PhotoCard from '../../../PhotoCard/PhotoCard';
import { getLocationTimePhotos } from '../../../../store/actions/location';
import { getAllPeriods } from '../../../../store/actions/period';
import { getTimePeriodById } from '../../../../store/actions/period';

import styles from './LocationTime.module.css';

const LocationTime = ({
  locationState: {
    locationObj,
    loading,
    totalPhotos,
    currentPage,
    hasNextPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    itemsPerPage,
    previousPage
  },
  photos,
  periods,
  period,
  getLocationTimePhotos,
  getAllPeriods,
  getTimePeriodById,
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
    previousPage: null,
    itemsPerPage: 0
  });

  const UrlQueryStrings = location.search;
  const queryValues = queryString.parse(UrlQueryStrings);
  const pageNow = queryValues.page;

  useEffect(() => {
    getLocationTimePhotos(match.params.id, match.params.idPeriod, pageNow);
    getAllPeriods();
  }, [
    getLocationTimePhotos,
    getAllPeriods,
    match.params.id,
    match.params.idPeriod
  ]);

  useEffect(() => {
    getTimePeriodById(match.params.idPeriod);
  }, [getTimePeriodById, match.params.idPeriod]);

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
          cardInfo={photo.periodName}
          src={`../../../uploads/thumbs/${photo.photoFileName}`}
        />
      </Link>
    </div>
  ));

  const getPhotosHadler = pageNum =>
    getLocationTimePhotos(match.params.id, match.params.idPeriod, pageNum);
  const comeFrom = location.search;

  const showLocation = (
    <Fragment>
      <Head title={locationName} content={locationName} />
      <div className={styles.Container}>
        {comeFrom && comeFrom.length === 0 && period !== null && (
          <TitleBlock pageTitle={locationName} addInfo={period.periodName} />
        )}
        {(comeFrom.length !== 0 ||
          !loading ||
          locationID === match.params.id) &&
          period !== null && (
            <TitleBlock pageTitle={locationName} addInfo={period.periodName} />
          )}
        {!loading && (
          <div className={styles.DropdownPanel}>
            {' '}
            <div className={styles.Dropdown}>
              {' '}
              <DropdownPeriod locationID={locationID} periods={periods} />
            </div>
          </div>
        )}
        {!loading && photoCards.length === 0 && <h2>No images here yet</h2>}
        {(loading || locationID === match.params.id) && <Spinner />}
        {(!loading || locationID === match.params.id) && (
          <Fragment>
            <div className={styles.Location}>{photoCards}</div>
          </Fragment>
        )}
        {totalPhotos <= itemsPerPage ? null : (
          <Fragment>
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
          </Fragment>
        )}
      </div>
    </Fragment>
  );

  return <Fragment>{showLocation}</Fragment>;
};

Location.propTypes = {
  getLocationTimePhotos: PropTypes.func.isRequired,
  getAllPeriods: PropTypes.func.isRequired,
  getTimePeriodById: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  periods: PropTypes.array.isRequired,
  period: PropTypes.object.isRequired,
  locationState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  locationState: state.location,
  photos: state.location.photos,
  periods: state.period.periods,
  period: state.period.period
});

export default connect(mapStateToProps, {
  getLocationTimePhotos,
  getAllPeriods,
  getTimePeriodById
})(LocationTime);
