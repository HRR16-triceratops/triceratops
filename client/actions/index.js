import * as types from '../constants/ActionTypes';
import helper from '../services/helper';

// action creators
export const makeLoginRequest = (userData) => {
  var url = '/auth/login';
  var request = helper.postHelper(url, userData);

	return {
		type: types.LOGIN_REQUEST,
    payload: request
	};
};

export const loginSuccess = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: user
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

// thunks
// attemptLogin(username,password){
// 	return (dispatch, getState) => {
// 		dispatch(makeLoginRequest());
// 		// make API call here with help of helpers.
// 				// if successful, dispatch LOGIN SUCCESS
// 				// else dispatch LOGIN FAILURE
// 	};
// }
