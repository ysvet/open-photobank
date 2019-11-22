import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Head from '../../Head/Head';
import Spinner from '../../UI/Spinner/Spinner';
import TitleBlock from '../../TitleBlock/TitleBlock';
// import CategoryCard from './CategoryCard/CategoryCard';
import Card from '../../Card/Card';
import { getAllCategories } from '../../../store/actions/category';

import styles from './Categories.module.css';

const Categories = ({
  getAllCategories,
  category: { categories, loading }
}) => {
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

  const displayCategories = (
    <Fragment>
      <Head title='Categories' content='open photobank' />
      <div className={styles.Container}>
        <TitleBlock pageTitle={'Categories'} />
        <div>
          <div className={styles.Category}>{photoCategoriesCards}</div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {categories === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>{displayCategories}</Fragment>
      )}
    </Fragment>
  );
};

Categories.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    category: state.category
  };
};

export default connect(mapStateToProps, { getAllCategories })(Categories);
