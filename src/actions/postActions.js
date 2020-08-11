import { ADD_POST, GET_ERRORS } from './types';
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