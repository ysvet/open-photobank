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
import { getPeriodPhotos } from '../../../../store/actions/period';
import styles from './Period.module.css';

const Period = ({
  period: {
    period,
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
  getPeriodPhotos,
  match,
  location,
  lang
}) => {
  const [formData, setFormData] = useState({
    periodID: match.params.id,
    periodName: ''
  });

  const { periodName, periodID } = formData;

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
    getPeriodPhotos(match.params.id, pageNow);
  }, [getPeriodPhotos]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && period !== null) {
      const { periodID, periodName } = period;
      setFormData({
        periodID,
        periodName
      });
      setPhotosData(photosData);
    }
  }, [period, isMounted, loading]);

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

  const getPhotosHadler = pageNum => getPeriodPhotos(match.params.id, pageNum);
  const comeFrom = location.search;

  const showPeriod = (
    <Fragment>
      <Head title={periodName} content={periodName} />
      <div className={styles.Container}>
        {comeFrom && comeFrom.length === 0 && (
          <TitleBlock pageTitle={periodName} />
        )}
        {(comeFrom.length !== 0 ||
          !loading ||
          periodID === match.params.id) && (
          <TitleBlock pageTitle={periodName} />
        )}
        {!loading && photoCards.length === 0 && <span>No images here yet</span>}
        {(loading || periodID === match.params.id) && <Spinner />}
        {(!loading || periodID === match.params.id) && (
          <Fragment>
            <div className={styles.Period}>{photoCards}</div>
          </Fragment>
        )}
        <div className={styles.WhiteLine}>{''}</div>
        {photoCards.length !== 0 && (
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
        )}
      </div>
    </Fragment>
  );

  return <Fragment>{showPeriod}</Fragment>;
};

Period.propTypes = {
  getPeriodPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  period: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  period: state.period,
  photos: state.period.photos
});

export default connect(mapStateToProps, { getPeriodPhotos })(Period);
