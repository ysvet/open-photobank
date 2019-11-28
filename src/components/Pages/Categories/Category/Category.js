import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useIsMounted from '../../../../utils/isMounted';

import Head from '../.././../Head/Head';
import Spinner from '../../../UI/Spinner/Spinner';
import PhotoCard from '../../../PhotoCard/PhotoCard';
import TitleBlock from '../../../TitleBlock/TitleBlock';
import { getCategoryPhotos } from '../../../../store/actions/category';
import Pagination from '../../../Navigation/Pagination/Pagination';

import styles from './Category.module.css';

const Category = ({
  fetchedCategory: {
    category,
    categoryPhotos,
    loading,
    totalPhotos,
    currentPage,
    hasNextPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    previousPage,
    itemsPerPage
  },
  getCategoryPhotos,
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
    getCategoryPhotos(match.params.id, pageNow);
  }, [getCategoryPhotos]);

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

  let photoCards = categoryPhotos.map(photo => (
    <div className={styles.SlideCard} key={photo.photoID}>
      <Link to={`/photos/${photo.photoID}`}>
        <PhotoCard
          title={photo.title}
          cardInfo={photo.locationName}
          src={`../uploads/thumbs/${photo.photoFileName}`}
        />
      </Link>
    </div>
  ));

  const getPhotosHadler = pageNum =>
    getCategoryPhotos(match.params.id, pageNum);
  const comeFrom = location.search;

  let displayCategory = (
    <Fragment>
      <Head title={categoryName} content='open photobank' />
      <div className={styles.Container}>
        {comeFrom && comeFrom.length === 0 && (
          <TitleBlock pageTitle={categoryName} />
        )}
        {(comeFrom.length !== 0 ||
          !loading ||
          categoryID === match.params.id) && (
          <TitleBlock pageTitle={categoryName} />
        )}
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
              getPhotosHadler={getPhotosHadler}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );

  return <Fragment>{displayCategory}</Fragment>;
};

Category.propTypes = {
  getCategoryPhotos: PropTypes.func.isRequired,
  fetchedCategory: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    fetchedCategory: state.category
  };
};

export default connect(mapStateToProps, { getCategoryPhotos })(Category);
