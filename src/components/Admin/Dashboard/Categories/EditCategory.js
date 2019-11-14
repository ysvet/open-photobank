import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import Spinner from '../../../UI/Spinner/Spinner';
import styles from '../../Admin.module.css';
import {
  getCategoryById,
  createCategory
} from '../../../../store/actions/category';
import useIsMounted from '../../../../utils/isMounted';

const EditCategory = ({
  category: { category, loading },
  createCategory,
  getCategoryById,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    categoryID: match.params.id,
    categoryName: '',
    categoryDescription: ''
  });

  const { categoryName, categoryID, categoryDescription } = formData;
  //only get category by id when id changed
  useEffect(() => {
    getCategoryById(categoryID);
  }, [getCategoryById]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && category !== null) {
      const { categoryID, categoryName } = category;
      setFormData({
        categoryID,
        categoryName,
        categoryDescription
      });
    }
  }, [category, isMounted, loading]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createCategory(formData, history, true);
  };

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Edit category
        </h2>
        <Fragment>
          {category === null || loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <form className={styles.Form} onSubmit={e => onSubmit(e)}>
                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Category name'
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
                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Category ID'
                    name='categoryID'
                    value={categoryID}
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
                  to='/adm/categories'
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

EditCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
  getCategoryById: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  { createCategory, getCategoryById }
)(withRouter(EditCategory));
