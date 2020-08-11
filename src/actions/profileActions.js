import axios from 'axios';
import { 
  CLEAR_CURRENT_PROFILE, 
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING, 
  GET_ERRORS, 
  SET_CURRENT_USER } from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
  .then(response => {
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  })
  .catch()
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
};

export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
  .then(response => {
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  })
  .catch()
    dispatch({
      type: GET_PROFILE,
      payload: null
    });
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all')
  .then(response => {
    dispatch({
      type: GET_PROFILES,
      payload: response.data
    })
  })
  .catch(err => {
    dispatch({
      type: GET_PROFILES,
      payload: null
    });
  })
};

export const createProfile = (profile, history) => dispatch => {
  axios.post('/api/profile', profile)
  .then(res => history.push('/dashboard'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const addExperience = (experience, history) => dispatch => {
  axios.post('/api/profile/experience', experience)
  .then(res => history.push('/dashboard'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

export const addEducation = (education, history) => dispatch => {
  axios.post('/api/profile/education', education)
  .then(res => history.push('/dashboard'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

export const deleteEducation = (id) => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
  .then(res => 
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const deleteExperience = (id) => dispatch => {
  axios.delete(`/api/profile/experience/${id}`)
  .then(res => 
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This cannot be undone.')) {
    axios.delete('/api/profile')
    .then(response => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    })
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
};