import * as types from '../constants/ActionTypes';
import helper from '../services/helper';
import { browserHistory } from 'react-router';
import {reset} from 'redux-form';

//////////////////////////////////////////////////////////////
// Synchronous Action Creators
//////////////////////////////////////////////////////////////

/**
 *  @param {Object} userData - Login credentials (username, password)
 */
export const makeLoginRequest = (userData) => {
  return {
    type: types.LOGIN_REQUEST,
    payload: userData
  };
};

/**
 *  @param {Object} user - user data excluding password
 *  @param {String} token - JWT token data
 */
export const loginSuccess = (user, token) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      user: user,
      token: token
    }
  };
};

/**
 *  @param {Object} err - Response object returned from server
 */
export const loginFailure = (err) => {
  return {
    type: types.LOGIN_FAILURE,
    payload: err
  };
};

/**
 *  @param {Object} userData - Login credentials (username, email, password)
 */
export const makeSignupRequest = (userData) => {
  return {
    type: types.SIGNUP_REQUEST,
    payload: userData
  };
};

/**
 *  @param {Object} user - user data excluding password
 *  @param {String} token - JWT token data
 */
export const signupSuccess = (user, token) => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: {
      user: user,
      token: token
    }
  };
};

/**
 *  @param {Object} err - Response object returned from server
 */
export const signupFailure = (err) => {
  return {
    type: types.SIGNUP_FAILURE,
    payload: err
  };
};

export const logOut = () => {
  return {
    type: types.LOGOUT
  };
};

/**
 *  @param {String} token - JWT token data stored in localStorage
 */
export const verifyUser = (token) => {
  return {
    type: types.VERIFY_USER,
    payload: {
      token: token
    }
  };
};

/**
 *  @param {Object} user - user data excluding password
 *  @param {String} token - JWT token data
 */
export const verifySuccess = (user, token) => {
  return {
    type: types.VERIFY_SUCCESS,
    payload: {
      user: user,
      token: token
    }
  };
};

/**
 *  @param {Object} err - Response object returned from server
 */
export const verifyFailure = (err) => {
  return {
    type: types.VERIFY_FAILURE,
    payload: err
  };
};

export const search = (query) => {
  return {
    type: types.SEARCH,
    payload: query.search
  };
};

//////////////////////////////////////////////////////////////
// Asynchronous Action Creator combination
//////////////////////////////////////////////////////////////

/**
 *  @param {Object} userData - Login credentials (username, password)
 */
export const attemptLogin = (userData) => {
  return function (dispatch) {
    dispatch(makeLoginRequest(userData));
    var url = '/auth/login';
    return helper.postHelper(url, userData)
      .then(resp => {
        let data = resp.data;
        if(resp.status != 200) {
          dispatch(loginFailure(resp.payload));

        // If User is Authorized from server, save JWT token to localStorage,
        // dispatch success action and redirect to profile(dashboard) page
        } else {
          window.localStorage.setItem('jwtToken', data.token);
          dispatch(loginSuccess(data.user, data.token));
          browserHistory.push('/profile');
        }
      })

      // If User is rejected from server, dispatch failure action and reset login Form
      .catch(err => {
        console.error(err);
        dispatch(loginFailure(err));
        dispatch(reset('LoginForm'));
      });
  };
};

/**
 *  @param {Object} userData - Login credentials (username, email, password)
 */
export const attemptSignup = (userData) => {
  return (dispatch) => {
    dispatch(makeSignupRequest(userData));
    var url = '/auth/signup';
    return helper.postHelper(url, userData)
      .then(resp => {
        let data = resp.data;
        if(resp.status != 200) {
          console.log('resp status is not 200');

        // If User is Authorized from server, save JWT token to localStorage,
        // dispatch success action and redirect to profile(dashboard) page
        } else {
          window.localStorage.setItem('jwtToken', data.token);
          dispatch(signupSuccess(data.user, data.token));
          browserHistory.push('/profile');
        }
      })

      // If User is rejected from server, dispatch failure action and reset login Form
      .catch(err => {
        console.error(err);
        dispatch(signupFailure(err));
        dispatch(reset('SignupForm'));
      });
  };
};

/**
 *  @param {String} token - JWT token data stored in localStorage
 */
export const attemptVerify = (token) => {
  return (dispatch) => {
    let url = '/auth/verify';
    dispatch(verifyUser(token));
    return helper.getHelper(url)
      .then(resp => {
        let data = resp.data;

        // If User is verified from server,
        // dispatch success action which will update state
        dispatch(verifySuccess(data.user, data.token));
      })

      // If User is rejected from server, dispatch failure action
      .catch(err => {
        dispatch(verifyFailure(err));
      });
  };
};
