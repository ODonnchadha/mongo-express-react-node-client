import { ADD_POST, CLEAR_ERRORS, DELETE_POST, GET_ERRORS, GET_POST, GET_POSTS, POST_LOADING } from './types';
import axios from 'axios';

export const addComment = (id, comment) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/posts/comment/${id}`, comment)
  .then(response => {
    dispatch({
      type: GET_POST,
      payload: response.data
    })
  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const addLike = (id) => dispatch => {
  axios.post(`/api/posts/like/${id}`)
  .then(response => dispatch(getPosts()))
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const addPost = (postData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/posts', postData)
  .then(response => {
    dispatch({
      type: ADD_POST,
      payload: response.data
    })
  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`/api/posts/comment/${postId}/${commentId}`)
  .then(response => {
    dispatch({
      type: GET_POST,
      payload: response.data
    })
  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const deletePost = (id) => dispatch => {
  axios.delete(`/api/posts/${id}`)
  .then(response => {
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const getPost = (id) => dispatch => {
  dispatch(setPostLoading());
  axios.get(`/api/posts/${id}`)
  .then(response => {
    dispatch({
      type: GET_POST,
      payload: response.data
    })
  })
  .catch(err => 
    dispatch({
      type: GET_POST,
      payload: null
    })
  );
};

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios.get('/api/posts')
  .then(response => {
    dispatch({
      type: GET_POSTS,
      payload: response.data
    })
  })
  .catch(err => 
    dispatch({
      type: GET_POSTS,
      payload: null
    })
  );
};

export const removeLike = (id) => dispatch => {
  axios.post(`/api/posts/unlike/${id}`)
  .then(response => dispatch(getPosts()))
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}