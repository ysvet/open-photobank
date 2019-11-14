import React, { useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import Alert from '../../Alert/Alert';
import styles from '../../Admin.module.css';
import { createContributor } from '../../../../store/actions/contributor';

const AddContributor = ({
  createContributor,
  contributor: { contributor, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    web: ''
  });

  const { name, email, web } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createContributor(formData, history);
  };

  return loading && contributor === null ? (
    <Redirect to='/adm/contributors' />
  ) : (
    <Fragment>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h2 className={`${styles.Large} ${styles.TextPrimary}`}>
          {' '}
          Add contributor
        </h2>
        <Fragment>
          <form className={styles.Form} onSubmit={e => onSubmit(e)}>
            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Add contributor'
                name='name'
                value={name}
                onChange={e => onChange(e)}
              />
            </div>

            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Add email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </div>

            <div className={styles.FormGroup}>
              <input
                type='text'
                placeholder='Add web'
                name='web'
                value={web}
                onChange={e => onChange(e)}
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
      </div>
    </Fragment>
  );
};

AddContributor.propTypes = {
  createContributor: PropTypes.func.isRequired,
  contributor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  contributor: state.contributor
});

export default connect(
  mapStateToProps,
  { createContributor }
)(withRouter(AddContributor));
