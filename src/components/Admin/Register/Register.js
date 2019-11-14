import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Alert from "../Alert/Alert";
import { setAlert } from "../../../store/actions/alert";
import { register } from "../../../store/actions/auth";
import PropTypes from "prop-types";
import styles from "../Admin.module.css";

let regIsOpen = window.Configs.regIsOpen;

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password2: ""
  });

  const { name, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/adm" />;
  }

  return regIsOpen === false ? (
    <Redirect to="/not-found" />
  ) : (
    <Fragment>
      <Navbar />

      <div className={styles.Container}>
        <Alert />
        <h1 className={`${styles.Large} ${styles.TextPrimary}`}>Sign Up</h1>
        <p className={styles.Lead}>Create Your Account</p>
        <form className={styles.Form} onSubmit={e => onSubmit(e)}>
          <div className={styles.FormGroup}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          {/* <div className={styles.FormGroup}>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
          </div> */}
          <div className={styles.FormGroup}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className={styles.FormGroup}>
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <input
            type="submit"
            className={`${styles.Btn} ${styles.BtnPrimary}`}
            value="Register"
          />
        </form>
        <p className={styles.My1}>
          Already have an account? <Link to="/adm/login">Sign In</Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
