import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>has</Fragment>
        ) : (
          <Fragment>has not</Fragment>
        )}
        <div className='dash-buttons'>
          <a href='create-profile.html' className='btn'>
            <i className='fas fa-user-circle text-primary' /> Edit Profile
          </a>
          <a href='add-experience.html' className='btn'>
            <i className='fab fa-black-tie text-primary' /> Add Experience
          </a>
          <a href='add-education.html' className='btn'>
            <i className='fas fa-graduation-cap text-primary' /> Add Education
          </a>
        </div>
        <h2 className='my-2'>Experience Credentials</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th className='hide-sm'>Title</th>
              <th className='hide-sm'>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gravatar</td>
              <td className='hide-sm'>Front End Developer</td>
              <td className='hide-sm'>Jan 2018 - Current</td>
              <td>
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
            <tr>
              <td>Properly</td>
              <td className='hide-sm'>Designer</td>
              <td className='hide-sm'>Feb 2015 - Jan 2018</td>
              <td>
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 className='my-2'>Education Credentials</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th className='hide-sm'>Degree</th>
              <th className='hide-sm'>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monash</td>
              <td className='hide-sm'>Computer Science</td>
              <td className='hide-sm'>Sep 2014 - Jun 2017</td>
              <td>
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='my-2'>
          <button className='btn btn-danger'>
            <i className='fas fa-user-minus' /> Delete My Account
          </button>
        </div>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
