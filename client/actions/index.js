import * as types from '../constants/ActionTypes';
import helper from '../services/helper';

// action creators
const makeLoginRequest = (userData) => {
  var url = '/auth/login';
  var request = helper.postHelper(url, userData);

	return {
		type: types.LOGIN_REQUEST,
    payload: request
	};
};

const loginSuccess = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: user
  };
};

const loginFailure = (err) => {
  return {
    type: types.LOGIN_FAILURE,
    payload: err
  };
};

const makeSignupRequest = (userData) => {
  return {
    type: types.SIGNUP_REQUEST,
    payload: userData
  };
};

const logOut = () => {
  return {
    type: types.LOGOUT
  };
};

// thunks
attemptLogin(username,password){
	return (dispatch, getState) => {
		dispatch(makeLoginRequest());
		// make API call here with help of helpers.
				// if successful, dispatch LOGIN SUCCESS
				// else dispatch LOGIN FAILURE
	};
}
