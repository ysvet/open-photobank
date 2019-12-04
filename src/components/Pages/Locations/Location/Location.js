import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useIsMounted from '../../../../utils/isMounted';
import Collapsible from 'react-collapsible';

import Pagination from '../../../Navigation/Pagination/Pagination';
import Head from '../../../Head/Head';
import Spinner from '../../../UI/Spinner/Spinner';
import TitleBlock from '../../../TitleBlock/TitleBlock';
import PhotoCard from '../../../PhotoCard/PhotoCard';
import { getLocationPhotos } from '../../../../store/actions/location';
import { getAllCategories } from '../../../../store/actions/category';

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
    itemsPerPage,
    previousPage
  },
  photos,
  categories,
  getLocationPhotos,
  getAllCategories,
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
    getLocationPhotos(match.params.id, pageNow);
    getAllCategories();
  }, [getLocationPhotos, getAllCategories]);

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

  const [formCatData, setFormCatData] = useState({
    categoryID: ''
  });

  const { categoryID } = formCatData;

  const onChange = e =>
    setFormCatData({ ...formCatData, [e.target.name]: e.target.value });

  const selectCategory = categories.map(category => (
    <option key={category.categoryID} value={category.categoryID}>
      {category.categoryName}
    </option>
  ));

  let photoCards = photos.map(photo => (
    <div className={styles.SlideCard} key={photo.photoID}>
      <Link to={`/photos/${photo.photoID}`}>
        <PhotoCard
          title={photo.title}
          cardInfo={photo.categoryName}
          src={`../uploads/thumbs/${photo.photoFileName}`}
        />
      </Link>
    </div>
  ));

  const getPhotosHadler = pageNum =>
    getLocationPhotos(match.params.id, pageNum);

  const getCatPhotosHandler = catID =>
    getCatLocationPhotos(match.params.id, catID);

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
            <div className={styles.Filter}>
              <Collapsible
                trigger='Start here'
                className={styles.Collapsible}
                openedClassName={styles.CollapsibleOpened}
                contentOuterClassName={styles.CollapsibleOuter}
                contentInnerClassName={styles.CollapsibleInner}
                triggerStyle={{ padding: ' 5px 5px', cursor: 'pointer' }}
                triggerWhenOpen='Close filter'
              >
                <div className={styles.FormGroup}>
                  <select
                    name='categoryID'
                    value={categoryID}
                    onChange={e => onChange(e)}
                  >
                    <option value='0'>* Select category</option>
                    {selectCategory}
                  </select>
                </div>
                <NavLink
                  to={`?category=${categoryID}`}
                  onClick={() => getCatPhotosHandler(categoryID)}
                  exact
                  activeClassName={styles.active}
                >
                  Filter
                </NavLink>
              </Collapsible>
            </div>
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
  getLocationPhotos: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  locationState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  locationState: state.location,
  photos: state.location.photos,
  categories: state.category.categories
});

export default connect(mapStateToProps, {
  getLocationPhotos,
  getAllCategories
})(Location);
