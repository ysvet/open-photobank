import React, { useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import styles from '../../Admin.module.css';
import { createAlbum } from '../../../../store/actions/album';

const AddAlbum = ({ createAlbum, album: { album, loading }, history }) => {
  const [formData, setFormData] = useState({
    albumName: '',
    albumInfo: ''
  });

  const { albumName, albumInfo } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createAlbum(formData, history);
  };

  return loading && album === null ? (
    <Redirect to='/adm/albums' />
  ) : (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}> Add album</h2>
        <Fragment>
          <form className={styles.Form} onSubmit={e => onSubmit(e)}>
            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Album name'
                name='albumName'
                value={albumName}
                onChange={e => onChange(e)}
              />
            </div>
            <div className={styles.FormGroup}>
              <textarea
                rows='5'
                placeholder='Album info'
                name='albumInfo'
                value={albumInfo}
                onChange={e => onChange(e)}
              />
            </div>
            <input
              type='submit'
              className={`${styles.Btn} ${styles.BtnPrimary} ${styles.My1}`}
            />
            <Link
              className={`${styles.Btn} ${styles.BtnLight} ${styles.My1}`}
              to='/adm/albums'
            >
              Go Back
            </Link>
          </form>
        </Fragment>
      </div>
    </Fragment>
  );
};

AddAlbum.propTypes = {
  createAlbum: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  album: state.album
});

export default connect(mapStateToProps, { createAlbum })(withRouter(AddAlbum));
