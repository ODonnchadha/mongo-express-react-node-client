import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from './types';
import axios from 'axios';

export const addPost = (postData) => dispatch => {
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

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}