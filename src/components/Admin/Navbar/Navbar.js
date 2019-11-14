import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserAlt,
  faCogs
} from '@fortawesome/free-solid-svg-icons';
import styles from '../Admin.module.css';
import { logout } from '../../../store/actions/auth';
import { getCurrentProfile } from '../../../store/actions/profile';

const Navbar = ({ auth: { isAuthenticated, loading }, logout, user }) => {
  // useEffect(() => {
  //   getCurrentProfile();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getCurrentProfile]);

  const authLinks = (
    <ul>
      <li>
        <Link to='/adm'>
          <FontAwesomeIcon icon={faCogs} />
          <span className={styles.HideSm}> Dashboard</span>
        </Link>
      </li>

      <li>
        <a onClick={logout} href='#!'>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className={styles.HideSm}> Logout </span>
        </a>
      </li>
      <li>
        <FontAwesomeIcon icon={faUserAlt} />
        {/* <span> {'TEST'} </span> */}
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/adm/register'>Register</Link>
      </li>
      <li>
        <Link to='/adm/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <div>
      <nav className={`${styles.Navbar} ${styles.BgDark}`}>
        <h1>
          <Link to='/adm'>Dashboard</Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logout, getCurrentProfile }
)(Navbar);
