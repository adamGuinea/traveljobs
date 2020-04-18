import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  let history = useHistory();

  const statusRef = useRef();
  const companyRef = useRef();
  const websiteRef = useRef();
  const locationRef = useRef();
  const skillsRef = useRef();
  const githubRef = useRef();
  const bioRef = useRef();
  const socialInputRef = useRef();
  const submitRef = useRef();

  const sendKeyDown = (e, type) => {
    const key = e.key;
    switch (type) {
      case "status":
        if (key === "Enter") companyRef.current.focus();
        break;
      case "company":
        if (key === "Enter") websiteRef.current.focus();
        break;
      case "website":
        if (key === "Enter") locationRef.current.focus();
        break;
      case "location":
        if (key === "Enter") skillsRef.current.focus();
        break;
      case "skills":
        if (key === "Enter") githubRef.current.focus();
        break;
      case "github":
        if (key === "Enter") bioRef.current.focus();
        break;
      case "bio":
        if (key === "Enter") socialInputRef.current.focus();
        break;
      case "socialInput":
        if (key === "Enter") submitRef.current.focus();
        break;
      case "submit":
        if (key === "Enter") history.goBack();
        break;
      default:
        break;
    }
  };

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram
    });
    statusRef.current.focus();
  }, [loading, getCurrentProfile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit your profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <h4>Job Description</h4>
          <select
            name="status"
            ref={statusRef}
            onKeyDown={e => sendKeyDown(e, "status")}
            value={status}
            onChange={e => onChange(e)}
          >
            <option value="">* Select professional status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Tell us where you are in your career
          </small>
        </div>
        <div className="form-group">
          <h4>Company</h4>
          <input
            type="text"
            placeholder="Company"
            name="company"
            ref={companyRef}
            onKeyDown={e => sendKeyDown(e, "company")}
            value={company}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or the one you you work for
          </small>
        </div>
        <div className="form-group">
          <h4>Portfolio Website</h4>
          <input
            type="text"
            placeholder="Website"
            name="website"
            ref={websiteRef}
            onKeyDown={e => sendKeyDown(e, "website")}
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Either yours or your company website
          </small>
        </div>
        <div className="form-group">
          <h4>Location</h4>
          <input
            type="text"
            placeholder="Location"
            name="location"
            ref={locationRef}
            onKeyDown={e => sendKeyDown(e, "location")}
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            City and state suggested (eg. Brisbane, QLD)
          </small>
        </div>
        <div className="form-group">
          <h4>Technologies</h4>
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            ref={skillsRef}
            onKeyDown={e => sendKeyDown(e, "skills")}
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. Node,SASS)
          </small>
        </div>
        <div className="form-group">
          <h4>GitHub username</h4>
          <input
            type="text"
            placeholder="Github username"
            name="githubusername"
            ref={githubRef}
            onKeyDown={e => sendKeyDown(e, "github")}
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            For your latest repos and github link, include your username
          </small>
        </div>
        <div className="form-group">
          <h4>Bio</h4>
          <textarea
            placeholder="Short bio"
            rows={10}
            name="bio"
            ref={bioRef}
            onKeyDown={e => sendKeyDown(e, "bio")}
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Tell us about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            ref={socialInputRef}
            onKeyDown={e => sendKeyDown(e, "socialInput")}
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="LinkedIn URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input
          type="submit"
          ref={submitRef}
          onKeyDown={e => sendKeyDown(e, "submit")}
          className="btn btn-primary my-1"
        />
        <Link to="/dashboard" className="btn btn-light my-1">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
