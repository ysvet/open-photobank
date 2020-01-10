import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useIsMounted from '../../../../utils/isMounted';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Pagination from '../../../Navigation/Pagination/Pagination';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Admin.module.css';
import { getAllPhotos, deletePhoto } from '../../../../store/actions/photo';

const Photos = ({
  getAllPhotos,
  deletePhoto,
  photo: {
    photos,
    totalPhotos,
    currentPage,
    hasNextPage,
    nextPage,
    lastPage,
    hasPreviousPage,
    previousPage,
    loading
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

  const deletePhotoHandler = id => {
    confirmAlert({
      title: 'Confirm to delete photo',
      message: 'Are you sure to delete this photo?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deletePhoto(id)
        },
        {
          label: 'No'
          // onClick: () => onClose()
        }
      ]
    });
  };

  // const imgPath = photo.imgUrl;
  // const position = imgPath.indexOf('uploads');
  // const splitPosition = position + 8;

  // const thumbPath =
  //   imgPath.substring(0, splitPosition) +
  //   'thumbs\\' +
  //   imgPath.substring(splitPosition);

  const photosArray = photos.map(photo => (
    <tr key={photo.photoID}>
      <td>
        <Link to={`/photos/${photo.photoID}`}>{photo.photoID} </Link>
      </td>
      <td className={styles.HideSm}>
        <Link to={`/photos/${photo.photoID}`}>{photo.title} </Link>
      </td>
      <td className={styles.ThumbContainer}>
        <Link to={`/photos/${photo.photoID}`}>
          <img
            className={styles.Thumb}
            src={`../uploads/thumbs/${photo.photoFileName}`}
            alt={`${photo.title}`}
          />
        </Link>
      </td>
      <td>
        {/* Not using Link instead of a href because for some editing fields old data is present */}
        <a href={`/adm/edit-photo/${photo.photoID}`}>
          <button className={`${styles.Btn} ${styles.BtnEdit}`}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </a>
        {/* <Link to={`/adm/edit-photo/${photo.photoID}`}>
          <button className={`${styles.Btn} ${styles.BtnEdit}`}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link> */}
      </td>
      <td>
        <button
          onClick={() => deletePhotoHandler(photo.photoID)}
          className={`${styles.Btn} ${styles.BtnDanger}`}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  ));

  const getPhotosHadler = pageNum => getAllPhotos(pageNum);

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}> Photos</h2>
        <div className={styles.DashButtons}>
          <Link to='/adm' className={`${styles.Btn} ${styles.BtnLight}`}>
            Back to Dashboard
          </Link>
          <Link
            to='/adm/add-photo'
            className={`${styles.Btn} ${styles.BtnDark}`}
          >
            Add photo
          </Link>
        </div>

        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {photos.length > 0 ? (
                <Fragment>
                  {/* <h2 className={styles.My2}>Photos</h2> */}
                  <table className={`${styles.Table} ${styles.My2}`}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th className={styles.HideSm}>Title</th>
                        <th>Preview</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>{photosArray}</tbody>
                  </table>
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
              ) : (
                <h4>No photos found...</h4>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Photos.propTypes = {
  getAllPhotos: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  photo: state.photo
});

export default connect(mapStateToProps, { getAllPhotos, deletePhoto })(Photos);
