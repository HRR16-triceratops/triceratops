import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import LoginComponent from '../components/login.jsx';

console.log('Login page loaded!');

//For any field errors upon submission (i.e. not instant check)
const validateAndSignInUser = (values, dispatch) => {
  return new Promise((resolve, reject) => {

    dispatch(actions.makeLoginRequest(values))
    .then((response) => {
      let data = response.payload.data;
      //if any one of these exist, then there is a field error
      if(response.payload.status != 200) {
        //let other components know of error by updating the redux` state
        dispatch(actions.loginFailure(response.payload));
        reject(data); //this is for redux-form itself
      } else {
        //store JWT Token to browser session storage
        //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
        //sessionStorage = persisted only in current tab
        sessionStorage.setItem('jwtToken', response.payload.data.token);
        //let other components know that we got user and things are fine by updating the redux` state
        dispatch(actions.loginSuccess(response.payload));
        resolve();//this is for redux-form itself
      }
    });
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeLoginRequest: (userData) => {
      dispatch(actions.makeLoginRequest(userData));
    },
    loginSuccess: (user) => {
      dispatch(actions.loginSuccess(user));
    },
    loginFailure: (err) => {
      dispatch(actions.loginFailure(err));
    },
    resetMe: () =>{
      //sign up is not reused, so we dont need to resetUserFields
      //in our case, it will remove authenticated users
       // dispatch(resetUserFields());
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
