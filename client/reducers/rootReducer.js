import * as types from '../constants/ActionTypes';
// import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

// auth reducer
const auth = (state = {
  isAuthenticated: false,
  token: null,
  user: null
}, action) => {
  switch (action.type) {
  // assumes that JWT token is held in action.payload.
  case types.LOGIN_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      token: action.payload.token
    };
  case types.SIGNUP_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      token: action.payload.token
    };
  case types.VERIFY_SUCCESS:
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
      username: action.payload.user.username,
      displayName: action.payload.user.displayName,
      email: action.payload.user.email
    };
  case types.SIGNUP_SUCCESS:
    return {
      ...state,
      username: action.payload.user.username,
      displayName: action.payload.user.displayName,
      email: action.payload.user.email
    };
  case types.VERIFY_SUCCESS:
    return {
      ...state,
      username: action.payload.user.username,
      displayName: action.payload.user.displayName,
      email: action.payload.user.email
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
  case types.SIGNUP_REQUEST:
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
  form: formReducer,
  auth,
  user,
  ui,
  routing
});

export default rootReducer;
