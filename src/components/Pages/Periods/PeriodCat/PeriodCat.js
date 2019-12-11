import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useIsMounted from '../../../../utils/isMounted';

import DropdownPeriodCat from '../../../Navigation/Dropdown/DropdownPeriodCat';
import Pagination from '../../../Navigation/Pagination/Pagination';
import Head from '../../../Head/Head';
import Spinner from '../../../UI/Spinner/Spinner';
import TitleBlock from '../../../TitleBlock/TitleBlock';
import PhotoCard from '../../../PhotoCard/PhotoCard';
import { getPeriodCatPhotos } from '../../../../store/actions/period';
import { getAllCategories } from '../../../../store/actions/category';
import { getCategoryById } from '../../../../store/actions/category';

import styles from './PeriodCat.module.css';

const PeriodCat = ({
  period: {
    period,
    totalPhotos,
    currentPage,
    hasNextPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    previousPage,
    itemsPerPage,
    loading
  },
  photos,
  categories,
  category,
  getPeriodCatPhotos,
  getAllCategories,
  getCategoryById,
  match,
  location
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
    previousPage: null,
    itemsPerPage: 0
  });

  const UrlQueryStrings = location.search;
  const queryValues = queryString.parse(UrlQueryStrings);
  const pageNow = queryValues.page;

  useEffect(() => {
    getPeriodCatPhotos(match.params.id, match.params.idCat, pageNow);
    getAllCategories();
  }, [
    getPeriodCatPhotos,
    getAllCategories,
    match.params.id,
    match.params.idCat
  ]);

  useEffect(() => {
    getCategoryById(match.params.idCat);
  }, [getCategoryById, match.params.idCat]);

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
          cardInfo={photo.locationName}
          src={`../../../uploads/thumbs/${photo.photoFileName}`}
        />
      </Link>
    </div>
  ));

  console.log(category, 'CATEGORY');

  const getPhotosHandler = pageNum =>
    getPeriodCatPhotos(match.params.id, match.params.idCat, pageNum);
  const comeFrom = location.search;

  const showPeriod = (
    <Fragment>
      <Head title={periodName} content={periodName} />
      <div className={styles.Container}>
        {comeFrom && comeFrom.length === 0 && category !== null && (
          <TitleBlock pageTitle={periodName} addInfo={category.categoryName} />
        )}
        {(comeFrom.length !== 0 || !loading || periodID === match.params.id) &&
          category !== null && (
            <TitleBlock
              pageTitle={periodName}
              addInfo={category.categoryName}
            />
          )}

        {!loading && (
          <div className={styles.DropdownPanel}>
            <div className={styles.Dropdown}>
              <DropdownPeriodCat periodID={periodID} categories={categories} />
            </div>
          </div>
        )}
        {!loading && photoCards.length === 0 && <h2>No images here yet</h2>}
        {(loading || periodID === match.params.id) && <Spinner />}
        {(!loading || periodID === match.params.id) && (
          <Fragment>
            <div className={styles.Period}>{photoCards}</div>
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

  return <Fragment>{showPeriod}</Fragment>;
};

PeriodCat.propTypes = {
  getPeriodCatPhotos: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  getCategoryById: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  period: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  period: state.period,
  photos: state.period.photos,
  categories: state.category.categories,
  category: state.category.category
});

export default connect(mapStateToProps, {
  getPeriodCatPhotos,
  getAllCategories,
  getCategoryById
})(PeriodCat);
