import * as types from '../constants/ActionTypes';

// action creators
const makeLoginRequest = () => {
	return {
		type: types.LOGIN_REQUEST
	};
}

// thunks
attemptLogin(username,password){
	return (dispatch, getState) => {
		dispatch(makeLoginRequest());
		// make API call here with help of helpers.
				// if successful, dispatch LOGIN SUCCESS
				// else dispatch LOGIN FAILURE
	};
}