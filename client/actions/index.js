import * as types from '../constants/ActionTypes';
import helper from '../services/helper';
import { browserHistory } from 'react-router'

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
          browserHistory.push('/listings');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
};
