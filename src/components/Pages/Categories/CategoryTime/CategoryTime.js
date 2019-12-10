import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useIsMounted from '../../../../utils/isMounted';
import DropdownPeriod from '../../../Navigation/Dropdown/DropdownCatPer';

import Pagination from '../../../Navigation/Pagination/Pagination';
import Head from '../../../Head/Head';
import Spinner from '../../../UI/Spinner/Spinner';
import TitleBlock from '../../../TitleBlock/TitleBlock';
import PhotoCard from '../../../PhotoCard/PhotoCard';
import { getCategoryTimePhotos } from '../../../../store/actions/category';
import { getAllPeriods } from '../../../../store/actions/period';
import { getTimePeriodById } from '../../../../store/actions/period';

import styles from './CategoryTime.module.css';

const CategoryTime = ({
  categoryState: {
    category,
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
  getCategoryTimePhotos,
  getAllPeriods,
  getTimePeriodById,
  match,
  location
}) => {
  const [formData, setFormData] = useState({
    categoryID: match.params.id,
    categoryName: ''
  });
  const { categoryName, categoryID } = formData;

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
    getCategoryTimePhotos(match.params.id, match.params.idPeriod, pageNow);
    getAllPeriods();
  }, [
    getCategoryTimePhotos,
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
    if (loading === false && isMounted.current && category !== null) {
      const { categoryID, categoryName } = category;
      setFormData({
        categoryID,
        categoryName
      });
      setPhotosData(photosData);
    }
  }, [category, isMounted, loading]);

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

  const getPhotosHandler = pageNum =>
    getCategoryTimePhotos(match.params.id, match.params.idPeriod, pageNum);
  const comeFrom = location.search;

  const showCategory = (
    <Fragment>
      <Head title={categoryName} content={categoryName} />
      <div className={styles.Container}>
        {comeFrom && comeFrom.length === 0 && period !== null && (
          <TitleBlock pageTitle={categoryName} addInfo={period.periodName} />
        )}
        {(comeFrom.length !== 0 ||
          !loading ||
          categoryID === match.params.id) &&
          period !== null && (
            <TitleBlock pageTitle={categoryName} addInfo={period.periodName} />
          )}
        {!loading && (
          <div className={styles.DropdownPanel}>
            {' '}
            <div className={styles.Dropdown}>
              {' '}
              <DropdownPeriod categoryID={categoryID} periods={periods} />
            </div>
          </div>
        )}
        {!loading && photoCards.length === 0 && <h2>No images here yet</h2>}
        {(loading || categoryID === match.params.id) && <Spinner />}
        {(!loading || categoryID === match.params.id) && (
          <Fragment>
            <div className={styles.Category}>{photoCards}</div>
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
              getPhotosHadler={getPhotosHandler}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );

  return <Fragment>{showCategory}</Fragment>;
};

Location.propTypes = {
  getCategoryTimePhotos: PropTypes.func.isRequired,
  getAllPeriods: PropTypes.func.isRequired,
  getTimePeriodById: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  periods: PropTypes.array.isRequired,
  period: PropTypes.object.isRequired,
  categoryState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categoryState: state.category,
  photos: state.category.categoryPhotos,
  periods: state.period.periods,
  period: state.period.period
});

export default connect(mapStateToProps, {
  getCategoryTimePhotos,
  getAllPeriods,
  getTimePeriodById
})(CategoryTime);
