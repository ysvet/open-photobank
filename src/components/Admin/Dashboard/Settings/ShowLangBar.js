import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Spinner from '../../../../components/UI/Spinner/Spinner';

import styles from './ShowLangBar.module.css';
import { showBar, hideBar } from '../../../../store/actions/switchLang';

const ShowLangBar = ({ bar, showBar, hideBar }) => {
  let buttonLangBar = null;
  if (bar === true) {
    buttonLangBar = (
      <li className={styles.LanguageSwitch}>
        <button className={styles.ShowLangButton} onClick={hideBar}>
          Hide
        </button>
      </li>
    );
  } else if (bar === false) {
    buttonLangBar = (
      <li className={styles.LanguageSwitch}>
        <button className={styles.ShowLangButton} onClick={showBar}>
          Show
        </button>
      </li>
    );
  }
  return <Fragment>{buttonLangBar}</Fragment>;
};

ShowLangBar.propTypes = {
  hideBar: PropTypes.func.isRequired,
  showBar: PropTypes.func.isRequired,
  bar: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    bar: state.switchLang.showBar
  };
};

export default connect(
  mapStateToProps,
  { hideBar, showBar }
)(ShowLangBar);
