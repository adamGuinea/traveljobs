import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const registerRef = useRef();

  const sendKeyDown = (e, type) => {
    const key = e.key;
    switch (type) {
      case "name":
        if (key === "Enter") emailRef.current.focus();
        break;
      case "email":
        if (key === "Enter") passwordRef.current.focus();
        break;
      case "password":
        if (key === " Enter") password2Ref.current.focus();
        break;
      case "password2":
        if (key === "Enter") registerRef.current.focus();
        break;
      default:
        break;
    }
  };

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("password does not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create your account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            ref={nameRef}
            onKeyDown={e => sendKeyDown(e, "name")}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            ref={emailRef}
            onKeyDown={e => sendKeyDown(e, "email")}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email.
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            ref={passwordRef}
            onKeyDown={e => sendKeyDown(e, "password")}
            onChange={e => onChange(e)}
            minLength="8"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="confirm password"
            name="password2"
            value={password2}
            ref={password2Ref}
            onKeyDown={e => sendKeyDown(e, "password2")}
            onChange={e => onChange(e)}
            minLength="8"
            required
          />
        </div>
        <input
          type="submit"
          ref={registerRef}
          value="register"
          className="btn btn-primary"
        />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
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
