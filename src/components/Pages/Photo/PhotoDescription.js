import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PhotoDescription = ({
  photoID,
  title,
  categoryName,
  categoryName2,
  categoryName3,
  categoryID,
  categoryID2,
  categoryID3,
  contributorName,
  albumID,
  albumName,
  contributorID,
  periodID,
  periodName,
  locationID,
  locationName,
  author,
  source,
  sourceWeb
}) => {
  return (
    <Fragment>
      <ul>
        {photoID ? (
          <li>
            <strong>ID:</strong> {photoID}
          </li>
        ) : null}
        {title ? (
          <li>
            <strong>Title:</strong> {title}
          </li>
        ) : null}

        {categoryName ? (
          <li>
            <strong>Category</strong>:{' '}
            <Link to={`/categories/${categoryID}`}>{categoryName} </Link>
            {categoryName2 ? (
              <span>
                {' | '}
                <Link to={`/categories/${categoryID2}`}>{categoryName2} </Link>
              </span>
            ) : null}
            {categoryName3 ? (
              <span>
                {' | '}
                <Link to={`/categories/${categoryID3}`}>{categoryName3} </Link>
              </span>
            ) : null}
          </li>
        ) : null}
        {albumName ? (
          <li>
            <strong>Album:</strong>{' '}
            <Link to={`/albums/${albumID}`}>{albumName} </Link>
          </li>
        ) : null}
        {locationName ? (
          <li>
            <strong>Location:</strong>{' '}
            <Link to={`/locations/${locationID}`}>{locationName} </Link>
          </li>
        ) : null}
        {contributorName ? (
          <li>
            <strong>Contributor:</strong>{' '}
            <Link to={`/contributors/${contributorID}`}>
              {contributorName}{' '}
            </Link>
          </li>
        ) : null}
        {periodName ? (
          <li>
            <strong>Time period:</strong>{' '}
            <Link to={`/time-periods/${periodID}`}>{periodName} </Link>
          </li>
        ) : null}
        {source ? (
          <li>
            <strong>Source:</strong>
            {source}
            {sourceWeb ? (
              <span>
                {' | '}
                <a
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                  href={`${sourceWeb}`}
                >
                  {sourceWeb}{' '}
                </a>
              </span>
            ) : null}
          </li>
        ) : null}
        {author ? (
          <li>
            <strong>Author:</strong> {author}
          </li>
        ) : null}
      </ul>
    </Fragment>
  );
};

PhotoDescription.propTypes = {};

export default PhotoDescription;
