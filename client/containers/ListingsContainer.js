import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import ListingsComponent from '../components/Listings.js';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdatedProducts: () => {
      dispatch(actions.fetchUpdatedProducts());
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    products: state.products
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsComponent);
