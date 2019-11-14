import React, { useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import styles from '../../Admin.module.css';
import { createCategory } from '../../../../store/actions/category';

const AddCategory = ({
  createCategory,
  category: { category, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryDescription: ''
  });

  const { categoryName, categoryDescription } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createCategory(formData, history);
  };

  return loading && category === null ? (
    <Redirect to='/adm/categories' />
  ) : (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Add category
        </h2>
        <Fragment>
          <form className={styles.Form} onSubmit={e => onSubmit(e)}>
            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Category'
                name='categoryName'
                value={categoryName}
                onChange={e => onChange(e)}
              />
            </div>
            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Category Description'
                name='categoryDescription'
                value={categoryDescription}
                onChange={e => onChange(e)}
              />
            </div>
            <input
              type='submit'
              className={`${styles.Btn} ${styles.BtnPrimary} ${styles.My1}`}
            />
            <Link
              className={`${styles.Btn} ${styles.BtnLight} ${styles.My1}`}
              to='/adm/categories'
            >
              Go Back
            </Link>
          </form>
        </Fragment>
      </div>
    </Fragment>
  );
};

AddCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  { createCategory }
)(withRouter(AddCategory));
