import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import useIsMounted from '../../../utils/isMounted';

import Head from '../../Head/Head';
import Spinner from '../../UI/Spinner/Spinner';
import TitleBlock from '../../TitleBlock/TitleBlock';
import Pagination from '../../Navigation/Pagination/Pagination';
import PhotoCard from '../../PhotoCard/PhotoCard';
import styles from './Latest.module.css';
import { getAllPhotos } from '../../../store/actions/photo';

const Latest = ({
  getAllPhotos,
  photo: {
    photos,
    loading,
    totalPhotos,
    currentPage,
    hasNextPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    previousPage
  },
  location
}) => {
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
    getAllPhotos(pageNow);
  }, [getAllPhotos]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && photos.length > 0) {
      setPhotosData(photosData);
    }
  }, [photos, isMounted, loading]);

  let photoThumb = photos.map(photo => (
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

  const getPhotosHadler = pageNum => getAllPhotos(pageNum);

  const showLatest = (
    <Fragment>
      <Head title='Latest' content='Latest' />
      <div className={styles.Container}>
        <Fragment>
          <TitleBlock pageTitle={'Latest'} />
        </Fragment>

        <div className={styles.Latest}> {photoThumb}</div>
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
  return loading ? <Spinner /> : <Fragment>{showLatest}</Fragment>;
};

Latest.propTypes = {
  getAllPhotos: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    photo: state.photo
  };
};

export default connect(mapStateToProps, { getAllPhotos })(Latest);
