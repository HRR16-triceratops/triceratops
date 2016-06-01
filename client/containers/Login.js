import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import LoginComponent from '../components/login.jsx';
import { reduxForm } from 'redux-form';

console.log('Login page loaded!');

const mapDispatchToProps = (dispatch) => {
  return {
    makeLoginRequest: (userData) => {
      dispatch(actions.attemptLogin(userData));
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

export default reduxForm({
  form: 'LoginForm',
  fields: ['username', 'password']
}, mapStateToProps, mapDispatchToProps)(LoginComponent);
