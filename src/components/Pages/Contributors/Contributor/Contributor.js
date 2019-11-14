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
import styles from './Contributor.module.css';
import { getContributorPhotos } from '../../../../store/actions/contributor';

const Contributor = ({
  contributor: {
    contributor,
    totalPhotos,
    currentPage,
    hasNextPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    previousPage,
    loading,
    error
  },
  photos,
  getContributorPhotos,
  match,
  location
}) => {
  const [formData, setFormData] = useState({
    contributorID: match.params.id,
    name: ''
  });
  const { name, contributorID } = formData;

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
    getContributorPhotos(match.params.id, pageNow);
  }, [getContributorPhotos]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && contributor !== null) {
      const { contributorID, name } = contributor;
      setFormData({
        contributorID,
        name,
        error
      });
      setPhotosData(photosData);
    }
  }, [contributor, isMounted, loading]);

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
    getContributorPhotos(match.params.id, pageNum);

  const comeFrom = location.search;

  const showContributor = (
    <Fragment>
      <Head title={name} content='Contributors' />
      <div className={styles.Container}>
        {comeFrom && comeFrom.length === 0 && <TitleBlock pageTitle={name} />}
        {(comeFrom.length !== 0 ||
          !loading ||
          contributorID === match.params.id) && <TitleBlock pageTitle={name} />}
        {(loading || contributorID === match.params.id) && <Spinner />}
        {(!loading || contributorID === match.params.id) && (
          <Fragment>
            <div className={styles.Contributor}>{photoCards}</div>
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

  return <Fragment>{showContributor}</Fragment>;
};

Contributor.propTypes = {
  getContributorPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  contributor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  contributor: state.contributor,
  photos: state.contributor.photos
});

export default connect(mapStateToProps, { getContributorPhotos })(Contributor);
