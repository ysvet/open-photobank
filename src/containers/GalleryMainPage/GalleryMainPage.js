import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Head from '../../components/Head/Head';

import SliderBlock from '../Slider/Slider';
import Card from '../../components/Card/Card';
import DescriptionBlock from '../../components/Description/Description';
import Statistics from '../../components/Statistics/Statistics';
import { getAllCategories } from '../../store/actions/category';
import styles from './GalleryMainPage.module.css';

const GalleryMainPage = ({ getAllCategories, category: { categories } }) => {
  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  let photoCategoriesCards = categories.map(category => (
    <Link
      key={category.categoryID}
      to={{ pathname: `/categories/${category.categoryID}` }}
    >
      <Card
        cardTitle={category.categoryName}
        imgLink={`/img/cards/categories/${category.categoryID}.jpg`}
        cardText={category.categoryDescription}
      />
    </Link>
  ));

  const displayFrontPage = (
    <Fragment>
      <Head title='open photobank' content='open photobank' />

      <div className={styles.Container}>
        <DescriptionBlock description={'open photobank'} />
        <div className={styles.GalleryImage}>{photoCategoriesCards}</div>
        <hr />
        <div>
          <SliderBlock title={'Latest'} blockType='latest' />
          <Statistics />
        </div>
      </div>
    </Fragment>
  );

  return <div>{displayFrontPage}</div>;
};

GalleryMainPage.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    category: state.category
  };
};

export default connect(mapStateToProps, { getAllCategories })(GalleryMainPage);
