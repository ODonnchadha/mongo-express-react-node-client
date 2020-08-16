import { ADD_POST, DELETE_POST, GET_POSTS, POST_LOADING } from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case POST_LOADING:
      return {
        ...state,
        loadiing: true
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(p => p._id !== action.payload)
        }
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload,
          loadiing: false
        }
    default:
      return state;
  }
}