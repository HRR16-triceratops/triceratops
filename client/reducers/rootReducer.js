import * as types from '../constants/ActionTypes';
// import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

// auth reducer
const auth = (state = {
  isAuthenticated: false,
  token: null
}, action) => {
  switch (action.type) {
  // assumes that JWT token is held in action.payload.
  case types.LOGIN_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      token: action.payload.token
    };
  case types.LOGOUT:
    return {
      ...state,
      isAuthenticated: false,
      token: null
    };
  default:
    return state;
  }
};

// user reducer
const user = (state = {
  username: null,
  displayName: null,
  email: null
}, action) => {
  switch (action.type) {
  case types.LOGIN_SUCCESS:
    return {
      ...state,
      username: action.payload.username,
      displayName: action.payload.displayName,
      email: action.payload.email
    };
  case types.LOGOUT:
    return {
      ...state,
      username: null,
      displayName: null,
      email: null
    };
  default:
    return state;
  }
};

const ui = (state = {
  isAuthenticating: false
}, action) => {
  switch (action.type) {
  case types.LOGIN_REQUEST:
    return {
      ...state,
      isAuthenticating: true
    };
    // Not explicit, but only other requests will be SUCCESS/FAILURE,
    // which should trigger change away from 'pending/spinner' ui state.
  default:
    return {
      ...state,
      isAuthenticating: false
    };
  }
};

// need to add routing to handle route states syncing w/browser history ..
const rootReducer = combineReducers({
  auth,
  user,
  ui,
  routing
});

export default rootReducer;
