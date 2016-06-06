import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import NavBarComponent from '../components/NavBar.js';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      window.localStorage.setItem('jwtToken', '');
      dispatch(actions.logOut());
      dispatch(push('/listings'));
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
