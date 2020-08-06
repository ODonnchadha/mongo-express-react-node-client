import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import {createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      youtube: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skills = !isEmpty(profile.skills) ? profile.skills.join(',') : '';
      
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.company = !isEmpty(profile.company) ? profile.company : '';

      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skills,
        githubusername: profile.status,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        instagram:  profile.instagram,
        youtube: profile.youtube
      });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onSubmit(e) {
    e.preventDefault();

    const profile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      youtube: this.state.youtube,
    };
    
    this.props.createProfile(profile, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    const options = [
      {label:'* Select Professional Status',value:0},
      {label:'Developer',value:'Developer'},
      {label:'Manager',value:'Manager'},
      {label:'Student',value:'Student'},
    ];

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile url"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook profile url"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin profile url"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="YouTube profile url"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram profile url"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    };

    return (
      <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn byn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">Edit Profile</h1>
                <small className="d-block pb-3">* required fields:</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                    info="An unique handle for your profile URL. Your full name, company name, nickname, etc."
                  />
                  <SelectListGroup
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    error={errors.status}
                    options={options}
                    info="Provide us an idea as to where you are at within your career."
                  />
                  <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="This could be your own company or a company that you work for."
                  />
                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="This could be your very own website or a company website."
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="City or city and state are suggested. (e.g.: Duluth, MN.)"
                  />
                  <TextFieldGroup
                    placeholder="* Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="Please use comma-separated values. (e.g.: HTML,CSS,JavaScript,PHP.)"
                  />
                  <TextFieldGroup
                    placeholder="Github User Name"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChange}
                    error={errors.githubusername}
                    info="If you'd like to include your latest repositories and an associated link, include your user name."
                  />
                  <TextAreaFieldGroup
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Tell us a little about yourself."
                  />
                  <div className="mb-3">
                    <button type="button" className="btn btn-light" onClick={()=> 
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }))}>
                    + Add Social Network Links
                    </button>
                  </div>
                  {socialInputs}
                  <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
        </div>
      </div>
    );
  }
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));