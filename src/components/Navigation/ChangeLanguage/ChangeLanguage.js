import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/switchLang';

import styles from './ChangeLanguage.module.css';

const ChangeLanguage = ({ lang, onLangChangeRu, onLangChangeRo }) => {
  let langBar = null;
  if (lang === 'ru') {
    langBar = (
      <li className={styles.LanguageSwitch}>
        {/* <button className={styles.LanguageButtonActive}>РУ</button> */}

        <button className={styles.LanguageButton} onClick={onLangChangeRo}>
          RO
        </button>
      </li>
    );
  } else if (lang === 'ro') {
    langBar = (
      <li className={styles.LanguageSwitch}>
        <button className={styles.LanguageButton} onClick={onLangChangeRu}>
          РУ
        </button>

        {/* <button className={styles.LanguageButtonActive}>RO</button> */}
      </li>
    );
  }
  return <div>{langBar}</div>;
};

const mapStateToProps = state => {
  return {
    lang: state.switchLang.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLangChangeRu: () => dispatch(actionCreators.switchLangRu()),
    onLangChangeRo: () => dispatch(actionCreators.switchLangRo())
  };
};

//  export default ChangeLanguage;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeLanguage);
