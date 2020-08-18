import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CommentItem extends Component {

  render() {
    return (
        <div>
        </div>
    )
  }
}

CommentItem.propTypes = {
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, )(CommentItem);