import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="md-col-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Posts;