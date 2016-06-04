import * as types from '../constants/ActionTypes';

export default (state = {
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
