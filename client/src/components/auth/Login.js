import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const emailRef = useRef();
  const passwordRef = useRef();
  const submitRef = useRef();

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  const sendKeyDown = (e, type) => {
    const key = e.key;
    switch (type) {
      case "email":
        if (key === "Enter") passwordRef.current.focus();
        break;
      case "password":
        if (key === "Enter") submitRef.current.focus();
        break;
      default:
        break;
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign in to your account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="email"
            name="email"
            ref={emailRef}
            onKeyDown={e => sendKeyDown(e, "email")}
            value={email}
            onChange={e => onChange(e)}
            required
          />{" "}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="password"
            name="password"
            ref={passwordRef}
            onKeyDown={e => sendKeyDown(e, "password")}
            value={password}
            onChange={e => onChange(e)}
            minLength="8"
            required
          />{" "}
        </div>
        <input
          type="submit"
          ref={submitRef}
          value="login"
          className="btn btn-primary"
        />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
