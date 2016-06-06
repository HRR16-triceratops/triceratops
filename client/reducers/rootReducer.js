import * as types from '../constants/ActionTypes';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './authReducer.js';
import user from './userReducer.js';
import products from './productsReducer.js';
import ui from './uiReducer.js';

/**
 *  Root Reducer that combines every Reducers
 *  About Reducer in Redux : http://redux.js.org/docs/basics/Reducers.html
 */
const rootReducer = combineReducers({
  form: formReducer, // Reducer provided by 'redux-form' module
  auth,
  user,
  ui,
  products,
  routing
});

export default rootReducer;
