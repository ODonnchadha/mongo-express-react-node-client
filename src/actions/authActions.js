import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (user, history) => dispatch => {
  axios 
    .post('api/users/register', user)
    .then(result => history.push("/login"))
    .catch(err => 
      dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const loginUser = user => dispatch => {
  axios 
    .post('api/users/login', user)
    .then(result => {
      const { token } = result.data;
      localStorage.setItem('JwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })
  );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('JwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};