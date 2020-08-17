import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import PostItem from '../posts/PostItem';
import Spinner from '../common/Spinner';

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { loading, post } = this.props.post;
    let content;
    if (post ===null || loading || Object.keys(post).length === 0) {
      content = <Spinner />
    } else {
      content = (<div><PostItem post={post} showActions={false}/><CommentForm postId={post._id} /></div>)
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              { content }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);