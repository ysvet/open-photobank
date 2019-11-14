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
import { faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Admin.module.css';
import {
  getAllContributors,
  deleteContributor
} from '../../../../store/actions/contributor';

const Contributors = ({
  getAllContributors,
  deleteContributor,
  contributor: { contributors, loading }
}) => {
  useEffect(() => {
    getAllContributors();
  }, [getAllContributors]);

  const deleteContributorHandler = id => {
    confirmAlert({
      title: 'Confirm to delete contributor',
      message: 'Are you sure to delete this contributor?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteContributor(id)
        },
        {
          label: 'No'
          // onClick: () => onClose()
        }
      ]
    });
  };

  const contributorsArray = contributors.map(contributor => (
    <tr key={contributor.contributorID}>
      <td>
        <Link to={`/contributors/${contributor.contributorID}`}>
          {contributor.contributorID}
        </Link>
      </td>
      <td>
        <Link to={`/contributors/${contributor.contributorID}`}>
          {contributor.name}{' '}
        </Link>
      </td>
      <td>
        <Link to={`/adm/edit-contributor/${contributor.contributorID}`}>
          <button className={`${styles.Btn} ${styles.BtnEdit}`}>
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        </Link>
      </td>
      <td>
        <button
          onClick={() => deleteContributorHandler(contributor.contributorID)}
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
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Contributors
        </h2>
        <div className={styles.DashButtons}>
          <Link to='/adm' className={`${styles.Btn} ${styles.BtnLight}`}>
            Back to Dashboard
          </Link>
          <Link
            to='/adm/add-contributor'
            className={`${styles.Btn} ${styles.BtnDark}`}
          >
            Add contributor
          </Link>
        </div>

        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {contributors.length > 0 ? (
                <Fragment>
                  <table className={`${styles.Table} ${styles.My2}`}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>{contributorsArray}</tbody>
                  </table>
                </Fragment>
              ) : (
                <h4>No contributors found...</h4>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Contributors.propTypes = {
  getAllContributors: PropTypes.func.isRequired,
  deleteContributor: PropTypes.func.isRequired,
  contributor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  contributor: state.contributor
});

export default connect(
  mapStateToProps,
  { getAllContributors, deleteContributor }
)(Contributors);
