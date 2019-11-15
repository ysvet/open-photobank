import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import styles from '../../Admin.module.css';
import { createPhoto, getPhotoById } from '../../../../store/actions/photo';
import { getAllLocations } from '../../../../store/actions/location';
import { getAllCategories } from '../../../../store/actions/category';
import { getAllContributors } from '../../../../store/actions/contributor';
import { getAllAlbumsNoPage } from '../../../../store/actions/album';
import { getAllPeriods } from '../../../../store/actions/period';

const AddPhoto = ({
  createPhoto,
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
  history
}) => {
  const [formData, setFormData] = useState({
    title: '',
    file: '',
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
    title,
    file,
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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const fileSelectHandler = e => {
    const file = e.target.files[0];
    setFormData({ ...formData, file: file });
  };

  const onSubmit = e => {
    e.preventDefault();

    const form = new FormData();

    form.append('title', title);
    form.append('description', description);
    form.append('albumID', albumID);
    form.append('categoryID', categoryID);
    form.append('categoryID2', categoryID2);
    form.append('categoryID3', categoryID3);
    form.append('locationID', locationID);
    form.append('contributorID', contributorID);
    form.append('source', source);
    form.append('sourceWeb', sourceWeb);
    form.append('author', author);
    form.append('periodID', periodID);
    form.append('license', license);
    form.append('file', file);

    createPhoto(form, history);
  };

  useEffect(() => {
    getAllLocations();
    getAllCategories();
    getAllContributors();
    getAllAlbumsNoPage();
    getAllPeriods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAllLocations,
    getAllCategories,
    getAllContributors,
    getAllAlbumsNoPage,
    getAllPeriods
  ]);

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

  return loading && photo === null ? (
    <Redirect to='/adm/photos' />
  ) : (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />

        <Fragment>
          <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
            {' '}
            Add photo
          </h2>

          <small>* = required field</small>
          <form
            className={styles.Form}
            onSubmit={e => onSubmit(e)}
            encType='multipart/form-data'
          >
            <div>
              <input
                type='file'
                name='file'
                accept='.png, .jpg'
                onChange={e => fileSelectHandler(e)}
                className={`${styles.Btn} ${styles.BtnPrimary} ${styles.My1}`}
              />
            </div>
            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Photo Title'
                name='title'
                value={title}
                onChange={e => onChange(e)}
              />
            </div>

            <div className={styles.FormGroup}>
              <textarea
                rows='10'
                placeholder='*Photo description'
                name='description'
                value={description}
                onChange={e => onChange(e)}
              />
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
            </div>

            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Source'
                name='source'
                value={source}
                onChange={e => onChange(e)}
              />
            </div>

            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Source Web'
                name='sourceWeb'
                value={sourceWeb}
                onChange={e => onChange(e)}
              />
            </div>

            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Author'
                name='author'
                value={author}
                onChange={e => onChange(e)}
              />
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
            </div>

            <div className={styles.FormGroup}>
              <select
                name='license'
                value={license}
                onChange={e => onChange(e)}
              >
                <option value='0'>* Select license</option>
                <option value='Public Domain'>Public Domain</option>
                <option value='Attribution (CC BY)'>Attribution (CC BY)</option>
                <option value='Attribution-NonCommercial (CC BY-NC)'>
                  Attribution-NonCommercial (CC BY-NC)
                </option>
              </select>
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
      </div>
    </Fragment>
  );
};

AddPhoto.propTypes = {
  createPhoto: PropTypes.func.isRequired,
  getPhotoById: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  getAllLocations: PropTypes.func.isRequired,
  getAllContributors: PropTypes.func.isRequired,
  getAllAlbumsNoPage: PropTypes.func.isRequired,
  getAllPeriods: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
  locations: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  contributors: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired,
  periods: PropTypes.object.isRequired
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
  createPhoto,
  getPhotoById,
  getAllLocations,
  getAllCategories,
  getAllContributors,
  getAllAlbumsNoPage,
  getAllPeriods
})(withRouter(AddPhoto));
