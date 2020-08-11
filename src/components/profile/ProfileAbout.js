import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/isEmpty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const firstName = profile.user.name.trim().split(' ')[0];

    const skills = profile.skills.map((skill, index) => (
      <div key={index} class="p-3">
        <i class="fa fa-check"></i>
        {skill}
      </div>
    ));

    return (
      <div class="row">
      <div class="col-md-12">
        <div class="card card-body bg-light mb-3">
          <h3 class="text-center text-info">{firstName}'s Bio</h3>
          <p class="lead">
            {isEmpty(profile.bio) ? null : (<span>{profile.bio}</span>)}
          </p>
          <hr />
          <h3 class="text-center text-info">Skill Set</h3>
          <div class="row">
            <div class="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

ProfileAbout.ProfileAbout = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout;