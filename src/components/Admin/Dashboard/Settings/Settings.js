import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
// import Spinner from '../../../../components/UI/Spinner/Spinner';
import Navbar from "../../Navbar/Navbar";
import Alert from "../../Alert/Alert";
// import ShowLangBar from './ShowLangBar';
import styles from "../../Admin.module.css";
// import { showBar, hideBar } from '../../../../store/actions/switchLang';

let regIsOpen = window.Configs.regIsOpen;

const Settings = () => {
  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}> Settings</h2>
        <div className={styles.DashButtons}>
          <Link to="/adm" className={`${styles.Btn} ${styles.BtnLight}`}>
            Back to Dashboard
          </Link>
        </div>
        <Fragment>
          <table className={`${styles.Table} ${styles.My2}`}>
            <thead>
              <tr>
                <th>Action</th>
                <th>Edit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Registration status</th>
                <th>{""}</th>
                {regIsOpen === true ? (
                  <th>Registration Opened</th>
                ) : (
                  <th>Registration Closed</th>
                )}
              </tr>
              {/* <tr>
                <th>Show language bar</th>
                <th>
                  <ShowLangBar />
                </th>
                <th>Visible</th>
              </tr> */}
            </tbody>
          </table>
        </Fragment>
      </div>
    </Fragment>
  );
};

Settings.propTypes = {
  bar: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    bar: state.switchLang.showBar
  };
};

export default connect(mapStateToProps)(Settings);
