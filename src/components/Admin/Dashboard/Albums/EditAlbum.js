import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import Spinner from '../../../UI/Spinner/Spinner';
import styles from '../../Admin.module.css';
import { getAlbumById, createAlbum } from '../../../../store/actions/album';
import useIsMounted from '../../../../utils/isMounted';

const EditAlbum = ({
  album: { album, loading },
  createAlbum,
  getAlbumById,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    albumID: match.params.id,
    albumName: ''
  });

  const { albumName, albumID } = formData;
  //only get album by id when id changed
  useEffect(() => {
    getAlbumById(albumID);
  }, [getAlbumById]);

  // const pref = useRef({ albumID, getAlbumById });

  // //only get album by id when id changed
  // useEffect(() => {
  //   console.log('In the get data effect');
  //   getAlbumById(albumID);
  //   return () => {
  //     console.log('Clean up get data effect');
  //     if (albumID !== pref.current.albumID) {
  //       console.log('XXXX album ID changed:', pref.current.albumID, albumID);
  //     }
  //     if (getAlbumById !== pref.current.getAlbumById) {
  //       console.log(
  //         'XXX getAlbumById changed',
  //         pref.current.getAlbumById,
  //         getAlbumById
  //       );
  //     }
  //   };
  // }, [albumID, getAlbumById]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && album !== null) {
      const { albumID, albumName } = album;
      setFormData({
        albumID,
        albumName
      });
    }
  }, [album, isMounted, loading]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createAlbum(formData, history, true);
  };

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}> Edit album</h2>
        <Fragment>
          {album === null || loading ? (
            <Spinner />
          ) : (
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
                  <input
                    type='text'
                    placeholder='Album ID'
                    name='albumID'
                    value={albumID}
                    onChange={e => onChange(e)}
                    disabled
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
          )}
        </Fragment>
      </div>
    </Fragment>
  );
};

EditAlbum.propTypes = {
  createAlbum: PropTypes.func.isRequired,
  getAlbumById: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  album: state.album
});

export default connect(
  mapStateToProps,
  { createAlbum, getAlbumById }
)(withRouter(EditAlbum));
