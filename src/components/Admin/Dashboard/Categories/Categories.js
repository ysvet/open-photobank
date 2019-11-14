import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Admin.module.css';
import {
  getAllCategories,
  deleteCategory
} from '../../../../store/actions/category';

const Categories = ({
  getAllCategories,
  deleteCategory,
  category: { categories, loading }
}) => {
  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const deleteCategoryHandler = id => {
    confirmAlert({
      title: 'Confirm to delete category',
      message: 'Are you sure to delete this category?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteCategory(id)
        },
        {
          label: 'No'
          // onClick: () => onClose()
        }
      ]
    });
  };

  const categoriesArray = categories.map(category => (
    <tr key={category.categoryID}>
      <td className={styles.HideSm}>
        <Link to={`/categories/${category.categoryID}`}>
          {category.categoryID}
        </Link>
      </td>
      <td>
        <Link to={`/categories/${category.categoryID}`}>
          {category.categoryName}{' '}
        </Link>
      </td>
      <td>
        <Link to={`/adm/edit-category/${category.categoryID}`}>
          <button className={`${styles.Btn} ${styles.BtnEdit}`}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link>
      </td>
      <td>
        <button
          onClick={() => deleteCategoryHandler(category.categoryID)}
          className={`${styles.Btn} ${styles.BtnDanger}`}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}> Categories</h2>
        <div className={styles.DashButtons}>
          <Link to='/adm' className={`${styles.Btn} ${styles.BtnLight}`}>
            Back to Dashboard
          </Link>
          <Link
            to='/adm/add-category'
            className={`${styles.Btn} ${styles.BtnDark}`}
          >
            Add category
          </Link>
        </div>

        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {categories.length > 0 ? (
                <Fragment>
                  <table className={`${styles.Table} ${styles.My2}`}>
                    <thead>
                      <tr>
                        <th className={styles.HideSm}>ID</th>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>{categoriesArray}</tbody>
                  </table>
                </Fragment>
              ) : (
                <h4>No categories found...</h4>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
Categories.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  { getAllCategories, deleteCategory }
)(Categories);
