import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './/ProfileGithub';
import ProfileHeader from './ProfileHeader';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    return (
      <div>
          Profile
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  getProfileByHandle: PropTypes.func.isRequired,
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);