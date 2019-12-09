import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useIsMounted from '../../../../utils/isMounted';
import Dropdown from '../../../Navigation/Dropdown/Dropdown';

import Pagination from '../../../Navigation/Pagination/Pagination';
import Head from '../../../Head/Head';
import Spinner from '../../../UI/Spinner/Spinner';
import TitleBlock from '../../../TitleBlock/TitleBlock';
import PhotoCard from '../../../PhotoCard/PhotoCard';
import { getLocationCatPhotos } from '../../../../store/actions/location';
import { getAllCategories } from '../../../../store/actions/category';
import { getCategoryById } from '../../../../store/actions/category';

import styles from './LocationCat.module.css';

const LocationCat = ({
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
  categories,
  category,
  getLocationCatPhotos,
  getAllCategories,
  getCategoryById,
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
    getLocationCatPhotos(match.params.id, match.params.idCat, pageNow);
    getAllCategories();
  }, [
    getLocationCatPhotos,
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
    if (loading === false && isMounted.current && locationObj !== null) {
      const { locationID, locationName } = locationObj;
      setFormData({
        locationID,
        locationName
      });
      setPhotosData(photosData);
    }
  }, [locationObj, isMounted, loading]);

  console.log(category, 'CATEGORY');

  let photoCards = photos.map(photo => (
    <div className={styles.SlideCard} key={photo.photoID}>
      <Link to={`/photos/${photo.photoID}`}>
        <PhotoCard
          title={photo.title}
          cardInfo={photo.categoryName}
          src={`../../../uploads/thumbs/${photo.photoFileName}`}
        />
      </Link>
    </div>
  ));

  const getPhotosHadler = pageNum =>
    getLocationCatPhotos(match.params.id, match.params.idCat, pageNum);
  const comeFrom = location.search;

  const showLocation = (
    <Fragment>
      <Head title={locationName} content={locationName} />
      <div className={styles.Container}>
        {comeFrom && comeFrom.length === 0 && category !== null && (
          <TitleBlock
            pageTitle={locationName}
            addInfo={category.categoryName}
          />
        )}
        {(comeFrom.length !== 0 ||
          !loading ||
          locationID === match.params.id) &&
          category !== null && (
            <TitleBlock
              pageTitle={locationName}
              addInfo={category.categoryName}
            />
          )}
        {!loading && category !== null && (
          <div className={styles.DropdownPanel}>
            {' '}
            <div className={styles.Dropdown}>
              {' '}
              <Dropdown
                locationID={locationID}
                categories={categories}
                addInfo={category.categoryName}
              />
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
  getLocationCatPhotos: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  getCategoryById: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  category: PropTypes.object.isRequired,
  locationState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  locationState: state.location,
  photos: state.location.photos,
  categories: state.category.categories,
  category: state.category.category
});

export default connect(mapStateToProps, {
  getLocationCatPhotos,
  getAllCategories,
  getCategoryById
})(LocationCat);
