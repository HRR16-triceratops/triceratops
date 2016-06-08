import * as types from '../constants/ActionTypes';

/**
 *  Reducer related to User Authentication
 */
export default (state = {
  isAuthenticated: false, // Client will check a user if authorized or not with this state
  token: null             // Communicate with Server with token state
}, action) => {
  switch (action.type) {
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
