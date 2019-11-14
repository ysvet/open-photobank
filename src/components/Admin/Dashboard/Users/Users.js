import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import styles from '../../Admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getAllUsers, deleteUser } from '../../../../store/actions/auth';

const Users = ({ getAllUsers, deleteUser, auth: { users, loading } }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const usersArray = users.map(user => (
    <tr key={user._id}>
      <td>
        <Link to={`/users/${user._id}`}>{user._id}</Link>
      </td>
      <td>
        <Link to={`/users/${user._id}`}>{user.name} </Link>
      </td>
      <td>
        {/* <Link to={`/adm/edit-user/${user.userID}`}>
          <button className={`${styles.Btn} ${styles.BtnEdit}`}>
            {' '}
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link> */}
      </td>
      <td>
        <button
          onClick={() => deleteUser(user._id)}
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
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}> USERS</h2>
        <div className={styles.DashButtons}>
          <Link to='/adm' className={`${styles.Btn} ${styles.BtnLight}`}>
            Back to Dashboard
          </Link>
          {/* <Link
            to='/adm/add-user'
            className={`${styles.Btn} ${styles.BtnDark}`}
          >
            Add user
          </Link> */}
        </div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {users.length > 0 ? (
                <Fragment>
                  <table className={`${styles.Table} ${styles.My2}`}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>{usersArray}</tbody>
                  </table>
                </Fragment>
              ) : (
                <h4>No users found</h4>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
Users.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllUsers, deleteUser }
)(Users);
