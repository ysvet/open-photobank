import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Alert from '../Alert/Alert';
// import { setAlert } from '../../../store/actions/alert';
import { login } from '../../../store/actions/auth';
import PropTypes from 'prop-types';
import styles from '../Admin.module.css';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const { name, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(name, password);
  };

  //Redirect if loged in

  if (isAuthenticated) {
    return <Redirect to='/adm' />;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.Container}>
        <Alert />
        <h1 className={`${styles.Large} ${styles.TextPrimary}`}>Sign In</h1>
        <p className={styles.Lead}>Sign Into Your Account</p>
        <form className={styles.Form} onSubmit={e => onSubmit(e)}>
          <div className={styles.FormGroup}>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className={styles.FormGroup}>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>

          <input
            type='submit'
            className={`${styles.Btn} ${styles.BtnPrimary}`}
            value='Login'
          />
        </form>
        {/* <p className='my-1'>
          Don't have an account? <Link to='/adm/register'>Sign Up</Link>
        </p> */}
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
