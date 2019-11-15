import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import Spinner from '../../../UI/Spinner/Spinner';
import styles from '../../Admin.module.css';

import { getPhotoById, editPhoto } from '../../../../store/actions/photo';
import useIsMounted from '../../../../utils/isMounted';
import { getAllLocations } from '../../../../store/actions/location';
import { getAllCategories } from '../../../../store/actions/category';
import { getAllContributors } from '../../../../store/actions/contributor';
import { getAllAlbumsNoPage } from '../../../../store/actions/album';
import { getAllPeriods } from '../../../../store/actions/period';

const EditPhoto = ({
  editPhoto,
  getPhotoById,
  getAllLocations,
  getAllCategories,
  getAllContributors,
  getAllAlbumsNoPage,
  getAllPeriods,
  photo: { photo, loading },
  locations,
  categories,
  contributors,
  albums,
  periods,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    photoID: match.params.id,
    title: '',
    description: '',
    albumID: '',
    categoryID: '',
    categoryID2: '',
    categoryID3: '',
    locationID: '',
    contributorID: '',
    source: '',
    sourceWeb: '',
    author: '',
    periodID: '',
    license: ''
  });

  const {
    photoID,
    title,
    description,
    albumID,
    categoryID,
    categoryID2,
    categoryID3,
    locationID,
    contributorID,
    source,
    sourceWeb,
    author,
    periodID,
    license
  } = formData;

  useEffect(() => {
    getPhotoById(photoID);
    getAllLocations();
    getAllCategories();
    getAllContributors();
    getAllAlbumsNoPage();
    getAllPeriods();
  }, [
    getAllLocations,
    getAllCategories,
    getAllContributors,
    getAllAlbumsNoPage,
    getPhotoById,
    getAllPeriods
  ]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && photo !== null) {
      const {
        photoID,
        title,
        description,
        albumID,
        categoryID,
        categoryID2,
        categoryID3,
        locationID,
        contributorID,
        source,
        sourceWeb,
        author,
        periodID,
        license
      } = photo;
      setFormData({
        photoID,
        title,
        description,
        albumID,
        categoryID,
        categoryID2,
        categoryID3,
        locationID,
        contributorID,
        source,
        sourceWeb,
        author,
        periodID,
        license
      });
    }
  }, [photo, isMounted, loading]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    editPhoto(formData, history);
  };

  const selectLocation = locations.map(location => (
    <option key={location.locationID} value={location.locationID}>
      {location.locationName}
    </option>
  ));

  const selectAlbum = albums.map(album => (
    <option key={album.albumID} value={album.albumID}>
      {album.albumName}
    </option>
  ));

  const selectCategory = categories.map(category => (
    <option key={category.categoryID} value={category.categoryID}>
      {category.categoryName}
    </option>
  ));

  const selectCategory2 = categories.map(category => (
    <option key={category.categoryID} value={category.categoryID}>
      {category.categoryName}
    </option>
  ));

  const selectCategory3 = categories.map(category => (
    <option key={category.categoryID} value={category.categoryID}>
      {category.categoryName}
    </option>
  ));

  const selectContributor = contributors.map(contributor => (
    <option key={contributor.contributorID} value={contributor.contributorID}>
      {contributor.name}
    </option>
  ));

  const selectPeriod = periods.map(period => (
    <option key={period.periodID} value={period.periodID}>
      {period.periodName}
    </option>
  ));

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />

        <Fragment>
          <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
            {' '}
            Edit photo
          </h2>
          {photo === null || loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <small>* = required field</small>
              <form className={styles.Form} onSubmit={e => onSubmit(e)}>
                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='* Photo Title'
                    name='title'
                    value={title}
                    onChange={e => onChange(e)}
                  />
                  <small>Title</small>
                </div>

                <div className={styles.FormGroup}>
                  <textarea
                    rows='10'
                    placeholder='* Photo description'
                    name='description'
                    value={description}
                    onChange={e => onChange(e)}
                  />
                  <small>Description</small>
                </div>

                <div className={styles.FormGroup}>
                  <select
                    name='albumID'
                    value={albumID}
                    onChange={e => onChange(e)}
                  >
                    <option value='0'> Select album</option>
                    {selectAlbum}
                  </select>
                  <small>Album</small>
                </div>

                <div className={styles.FormGroup}>
                  <select
                    name='categoryID'
                    value={categoryID}
                    onChange={e => onChange(e)}
                  >
                    <option value='0'>* Select category</option>
                    {selectCategory}
                  </select>
                  <small>Category</small>
                </div>

                <div className={styles.FormGroup}>
                  <select
                    name='categoryID2'
                    value={categoryID2}
                    onChange={e => onChange(e)}
                  >
                    <option value='0'>Select second category</option>
                    {selectCategory2}
                  </select>
                  <small>Category 2</small>
                </div>

                <div className={styles.FormGroup}>
                  <select
                    name='categoryID3'
                    value={categoryID3}
                    onChange={e => onChange(e)}
                  >
                    <option value='0'>Select third category</option>
                    {selectCategory3}
                  </select>
                  <small>Category 3</small>
                </div>

                <div className={styles.FormGroup}>
                  <select
                    name='locationID'
                    value={locationID}
                    onChange={e => onChange(e)}
                  >
                    <option value='0'>* Select location</option>
                    {selectLocation}
                  </select>
                  <small>Location</small>
                </div>

                <div className={styles.FormGroup}>
                  <select
                    name='contributorID'
                    value={contributorID}
                    onChange={e => onChange(e)}
                  >
                    <option value='0'>* Select contributor</option>
                    {selectContributor}
                  </select>
                  <small>Contributor</small>
                </div>

                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Source'
                    name='source'
                    value={source}
                    onChange={e => onChange(e)}
                  />
                  <small>Source</small>
                </div>

                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Source Web'
                    name='sourceWeb'
                    value={sourceWeb}
                    onChange={e => onChange(e)}
                  />
                  <small>Source Web</small>
                </div>

                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Author'
                    name='author'
                    value={author}
                    onChange={e => onChange(e)}
                  />
                  <small>Author</small>
                </div>

                <div className={styles.FormGroup}>
                  <select
                    name='periodID'
                    value={periodID}
                    onChange={e => onChange(e)}
                  >
                    <option value='0'>* Select period</option>
                    {selectPeriod}
                  </select>
                  <small>Time Period</small>
                </div>

                <div className={styles.FormGroup}>
                  <select
                    name='license'
                    value={license}
                    onChange={e => onChange(e)}
                  >
                    <option value='0'>* Select license</option>
                    <option value='Public Domain'>Public Domain</option>
                    <option value='Attribution (CC BY)'>
                      Attribution (CC BY)
                    </option>
                    <option value='Attribution-NonCommercial (CC BY-NC)'>
                      Attribution-NonCommercial (CC BY-NC)
                    </option>
                  </select>
                  <small>License</small>
                </div>

                <input
                  type='submit'
                  className={`${styles.Btn} ${styles.BtnPrimary} ${styles.My1}`}
                />
                <Link
                  className={`${styles.Btn} ${styles.BtnLight} ${styles.My1}`}
                  to='/adm/photos'
                >
                  Go Back
                </Link>
              </form>
            </Fragment>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

EditPhoto.propTypes = {
  editPhoto: PropTypes.func.isRequired,
  getPhotoById: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  getAllLocations: PropTypes.func.isRequired,
  getAllContributors: PropTypes.func.isRequired,
  getAllAlbumsNoPage: PropTypes.func.isRequired,
  getAllPeriods: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  contributors: PropTypes.array.isRequired,
  albums: PropTypes.array.isRequired,
  periods: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  photo: state.photo,
  locations: state.location.locations,
  categories: state.category.categories,
  contributors: state.contributor.contributors,
  albums: state.album.albums,
  periods: state.period.periods
});
export default connect(mapStateToProps, {
  editPhoto,
  getPhotoById,
  getAllLocations,
  getAllCategories,
  getAllContributors,
  getAllAlbumsNoPage,
  getAllPeriods
})(withRouter(EditPhoto));
