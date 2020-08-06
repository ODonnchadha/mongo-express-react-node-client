import axios from 'axios';

const setAuthToken = token => {
  const a = 'Authorization';
  if (token) {
    axios.defaults.headers.common[a] = token;
  } else {
    delete axios.defaults.headers.common[a];
  }
};

export default setAuthToken;