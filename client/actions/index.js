import * as types from '../constants/ActionTypes';
import helper from '../services/helper';
import { browserHistory } from 'react-router';
import {reset} from 'redux-form';

// action creators
export const makeLoginRequest = (userData) => {
  return {
    type: types.LOGIN_REQUEST,
    payload: userData
  };
};

export const loginSuccess = (user, token) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      user: user,
      token: token
    }
  };
};

export const loginFailure = (err) => {
  return {
    type: types.LOGIN_FAILURE,
    payload: err
  };
};

export const makeSignupRequest = (userData) => {
  return {
    type: types.SIGNUP_REQUEST,
    payload: userData
  };
};

export const signupSuccess = (user, token) => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: {
      user: user,
      token: token
    }
  };
};

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

export const attemptLogin = (userData) => {
  return function (dispatch) {
    dispatch(makeLoginRequest(userData));
    var url = '/auth/login';
    return helper.postHelper(url, userData)
      .then(resp => {
        console.log(resp);
        let data = resp.data;
        if(resp.status != 200) {
          dispatch(loginFailure(resp.payload));
        } else {
          window.localStorage.setItem('jwtToken', data.token);
          dispatch(loginSuccess(data.user, data.token));
          browserHistory.push('/profile');
        }
      })
      .catch(err => {
        console.error(err);
        dispatch(loginFailure(err));
        dispatch(reset('LoginForm'));
      });
  };
};

export const attemptSignup = (userData) => {
  return (dispatch) => {
    dispatch(makeSignupRequest(userData));
    var url = '/auth/signup';
    return helper.postHelper(url, userData)
      .then(resp => {
        let data = resp.data;
        if(resp.status != 200) {
          console.log('resp status is not 200');
        } else {
          window.localStorage.setItem('jwtToken', data.token);
          dispatch(signupSuccess(data.user, data.token));
          browserHistory.push('/profile');
        }
      })
      .catch(err => {
        console.error(err);
        dispatch(signupFailure(err));
        dispatch(reset('SignupForm'));
      });
  };
};
