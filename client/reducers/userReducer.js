import * as types from '../constants/ActionTypes';

/**
 *  Reducer related to User information
 */
export default (state = {}, action) => {
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
