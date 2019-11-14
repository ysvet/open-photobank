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
import styles from '../../Admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getAllAlbums, deleteAlbum } from '../../../../store/actions/album';

const Albums = ({
  getAllAlbums,
  deleteAlbum,
  album: {
    albums,
    totalAlbums,
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
  const [albumsData, setAlbumsData] = useState({
    totalAlbums: 0,
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
    getAllAlbums(pageNow);
  }, [getAllAlbums]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && albums !== null) {
      setAlbumsData(albumsData);
    }
  }, [albums, isMounted, loading]);

  const deleteAlbumHandler = id => {
    confirmAlert({
      title: 'Confirm to delete album',
      message: 'Are you sure to delete this album?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteAlbum(id)
        },
        {
          label: 'No'
          // onClick: () => onClose()
        }
      ]
    });
  };

  const albumsArray = albums.map(album => (
    <tr key={album.albumID}>
      <td>
        <Link to={`/albums/${album.albumID}`}>{album.albumID}</Link>
      </td>
      <td>
        <Link to={`/albums/${album.albumID}`}>{album.albumName} </Link>
      </td>
      <td>
        <Link to={`/adm/edit-album/${album.albumID}`}>
          <button className={`${styles.Btn} ${styles.BtnEdit}`}>
            {' '}
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link>
      </td>
      <td>
        <button
          onClick={() => deleteAlbumHandler(album.albumID)}
          className={`${styles.Btn} ${styles.BtnDanger}`}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  ));

  const getPhotosHadler = pageNum => getAllAlbums(pageNum);

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}> ALBUMS</h2>
        <div className={styles.DashButtons}>
          <Link to='/adm' className={`${styles.Btn} ${styles.BtnLight}`}>
            Back to Dashboard
          </Link>
          <Link
            to='/adm/add-album'
            className={`${styles.Btn} ${styles.BtnDark}`}
          >
            Add album
          </Link>
        </div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {albums.length > 0 ? (
                <Fragment>
                  <table className={`${styles.Table} ${styles.My2}`}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>{albumsArray}</tbody>
                  </table>
                  <div className={styles.WhiteLine}>{''}</div>
                  <Pagination
                    totalPhotos={totalAlbums}
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
                <h4>No albums found</h4>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
Albums.propTypes = {
  getAllAlbums: PropTypes.func.isRequired,
  deleteAlbum: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  album: state.album
});

export default connect(
  mapStateToProps,
  { getAllAlbums, deleteAlbum }
)(Albums);
