import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import ProfileComponent from '../components/Profile.js';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToLogin: () => {
      dispatch(push('/login'));
    },
    fetchUpdatedProducts: () => {
      dispatch(actions.fetchUpdatedProducts());
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    auth: state.auth,
    products: state.products
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
