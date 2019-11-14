import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import Spinner from '../../../UI/Spinner/Spinner';
import styles from '../../Admin.module.css';

import {
  getContributorById,
  createContributor
} from '../../../../store/actions/contributor';
import useIsMounted from '../../../../utils/isMounted';

const EditContributor = ({
  contributor: { contributor, loading },
  createContributor,
  getContributorById,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    contributorID: match.params.id,
    name: '',
    email: '',
    web: ''
  });

  const { name, email, web, contributorID } = formData;
  //only get contributor by id when id changed
  useEffect(() => {
    getContributorById(contributorID);
  }, [getContributorById]);

  const isMounted = useIsMounted();
  useEffect(() => {
    //only if loading is false and still mounted
    if (loading === false && isMounted.current && contributor !== null) {
      const { contributorID, name, email, web } = contributor;
      setFormData({
        contributorID,
        name,
        email,
        web
      });
    }
  }, [contributor, isMounted, loading]);

  //   console.log(location, 'location');

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createContributor(formData, history, true);
  };

  return (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Edit contributor
        </h2>
        <Fragment>
          {contributor === null || loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <form className={styles.Form} onSubmit={e => onSubmit(e)}>
                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Contributor name'
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Web'
                    name='web'
                    value={web}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className={styles.FormGroup}>
                  <input
                    type='text'
                    placeholder='Contributor ID'
                    name='contributorID'
                    value={contributorID}
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
                  to='/adm/contributors'
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

EditContributor.propTypes = {
  createContributor: PropTypes.func.isRequired,
  getContributorById: PropTypes.func.isRequired,
  contributor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  contributor: state.contributor
});

export default connect(
  mapStateToProps,
  { createContributor, getContributorById }
)(withRouter(EditContributor));
