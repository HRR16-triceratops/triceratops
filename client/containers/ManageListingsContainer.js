import { connect } from 'react-redux';
import { toggleViewManageListings, toggleViewAddNewListingForm, fetchUpdatedProducts } from '../actions/index';
import * as actions from '../actions/index.js';
import ManageListingsComponent from '../components/ManageListings.js';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdatedProducts: () => {
      dispatch(actions.fetchUpdatedProducts());
    },
    removeItem: (item) => {
      dispatch(actions.removeRentedItem(item));
    },
    toggleViewManageListings: () => {
      dispatch(toggleViewManageListings());
    },
    toggleViewAddNewListingForm: () => {
      dispatch(toggleViewAddNewListingForm());
    }
  };
};

const mapStateToStore = (state) => {
  return {
    sharingItems: state.products.items.filter((item) => {
      // assuming unique usernames
      return item.author === state.user.username;
    }),
    ui: state.ui
  };
};

export default connect(mapStateToStore, mapDispatchToProps)(ManageListingsComponent);
