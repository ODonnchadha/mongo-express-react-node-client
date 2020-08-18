import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class Post extends CommentFeed {

  render() {
    const { comments, postId } = this.props;
    return comments.map(c => <CommentItem key={c._id} comment={c} postId={postId } />)
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
}

export default CommentFeed;