import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostFeed from './PostFeed';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let content;

    if (posts === null || loading) {
      content = <Spinner />;
    } else {
      content = <PostFeed posts={posts} />
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              { content }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);