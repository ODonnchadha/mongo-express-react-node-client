import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { addLike, deletePost, removeLike } from '../../actions/postActions';

class PostItem extends Component {
  onDelete(id) {
    this.props.deletePost(id);
  }
  onLike(id) {
    this.props.addLike(id);
  }
  onUnlike(id) {
    this.props.removeLike(id);
  }
  findUserLike(likes) {
    const { auth } = this.props;
    return likes.filter(like => like.user === auth.user.id).length > 0;
  }

  render() {
    const { auth, post } = this.props;

    return (
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <a href="profile.html">
                <img 
                  className="rounded-circle d-none d-md-block" 
                  src={post.avatar}
                  alt="" />
              </a>
              <br />
              <p className="text-center">
                {post.name}
              </p>
            </div>
            <div className="col-md-10">
              <p className="lead">
                {post.text}
              </p>
              <button onClick={this.onLike.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                <i className={classnames('fas fa-thumbs-up', {'text-info':this.findUserLike(post.likes)})} >
                </i>
                <span className="badge badge-light">
                  {post.likes.length}
                </span>
              </button>
              <button onClick={this.onUnlike.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down"></i>
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {post.user === auth.user.id ? 
              (<button 
                onClick={this.onDelete.bind(this, post._id)} 
                type="button" 
                className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button>) : null }
            </div>
          </div>
        </div>
    )
  }
}

PostItem.propTypes = {
  addLike: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToPorps = state => ({
  auth: state.auth
});

export default connect(mapStateToPorps, { addLike, deletePost, removeLike })(PostItem);