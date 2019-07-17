import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    console.log("success");
  };

  return (
    <Fragment>
      <div className='alert alert-danger'>Invalid Credentials</div>
      <h1 className='large text-primary'>Sign in</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign in to your account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />{" "}
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='8'
            required
          />{" "}
        </div>
        <input type='submit' value='login' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
