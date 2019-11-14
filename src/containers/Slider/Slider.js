import React, { Fragment, useEffect } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PhotoCard from '../../components/PhotoCard/PhotoCard';
import PhotoBlockCaption from '../../components/PhotoBlockCaption/PhotoBlockCaption';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getAllPhotos } from '../../store/actions/photo';
// import { photos } from '../../ImageData';
import styles from './Slider.module.css';

const SliderBlock = ({
  getAllPhotos,
  photo: { photos, loading },
  lang,
  blockType,
  title
}) => {
  useEffect(() => {
    getAllPhotos();
  }, [getAllPhotos]);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    // className: styles.SliderCustom,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          infinite: false
        }
      }
    ]
  };

  let photoThumb = photos.map(photo => (
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

  //Latest PhotoBlock

  const photoThumbLatest = photoThumb.reverse().slice(0, 10);

  //Random PhotoBlock

  const shuffle = array => {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  };

  const photoThumbRandom = shuffle(photoThumb).slice(0, 10);

  //Check for PhotoBlock type and display the block needed
  let link;
  let displayBlock = [];
  if (blockType === 'random') {
    displayBlock = photoThumbRandom;
    link = '/random';
  } else if (blockType === 'latest') {
    displayBlock = photoThumbLatest;
    link = '/latest';
  }

  return (
    <Fragment>
      <div>
        <PhotoBlockCaption title={title} link={link} />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.SliderBlock}>
          <Slider {...settings}>{displayBlock}</Slider>
        </div>
      )}
    </Fragment>
  );
};
SliderBlock.propTypes = {
  getAllPhotos: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    lang: state.switchLang.language,
    photo: state.photo
  };
};

export default connect(
  mapStateToProps,
  { getAllPhotos }
)(SliderBlock);
