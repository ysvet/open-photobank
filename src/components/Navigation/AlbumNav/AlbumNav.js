import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './AlbumNav.module.css';

const AlbumNav = ({ albumPhotos, photoID }) => {
  let arrowLinks = [];
  if (albumPhotos.length > 0) {
    arrowLinks = albumPhotos.map(ph => ph.photoID);
  }

  //getting data for for navigation between photos in an album
  const photoIndex = arrowLinks.indexOf(photoID);

  let nextPhoto;
  let previousPhoto;

  if (photoIndex === 0) {
    previousPhoto = arrowLinks.length - 1;
    nextPhoto = photoIndex + 1;
  } else if (photoIndex === arrowLinks.length - 1) {
    previousPhoto = photoIndex - 1;
    nextPhoto = 0;
  } else {
    previousPhoto = photoIndex - 1;
    nextPhoto = photoIndex + 1;
  }

  return (
    <div className={styles.AlbumNav}>
      <a href={`/photos/${arrowLinks[previousPhoto]}`}>
        <span>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
      </a>
      {' | '}
      <a href={`/photos/${arrowLinks[nextPhoto]}`}>
        <span>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </a>
    </div>
    // <div className={styles.AlbumNav}>
    //   <Link to={`/photos/${arrowLinks[previousPhoto]}`}>
    //     <span>Previous</span>
    //   </Link>
    //   {' | '}

    //   <Link to={`/photos/${arrowLinks[nextPhoto]}`}>
    //     <span>Next</span>
    //   </Link>
    // </div>
  );
};

export default withRouter(AlbumNav);
