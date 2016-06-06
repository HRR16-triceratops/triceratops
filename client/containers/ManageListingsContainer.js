import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import ManageListingsComponent from '../components/ManageListings.js';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToLogin: () => {
      dispatch(push('/login'));
    },
    fetchUpdatedProducts: () => {
      dispatch(actions.fetchUpdatedProducts());
    },
    removeItem: (item) => {
      dispatch(actions.removeRentedItem(item));
    },
    popupOpen: (content, key) => {
      dispatch(actions.popupOpen(content, key));
    },
    popupClose: () => {
      dispatch(actions.popupClose());
    },
    cancelItem: (item) => {
      dispatch(actions.cancelRentedItem(item));
    },
    toggleViewAddNewListingForm: () => {
      dispatch(actions.toggleViewAddNewListingForm());
    }
  };
};

const mapStateToStore = (state) => {
  return {
    sharingItems: state.products.items.filter((item) => {
      // assuming unique usernames
      return item.author === state.user.username;
    }),
    upcomingRent: () => {
      let result = [];
      state.products.items.reduce((prev, curr) => {
        const filteredItem = curr.rentSchedule.filter(schedule => {
          return schedule.username === state.user.username;
        });
        filteredItem.forEach(item => {
          var obj = Object.assign({}, curr);
          obj.schedule = item;
          result.push(obj);
        });
        return curr;
      }, '');
      return result;
    },
    user: state.user,
    ui: state.ui,
    auth: state.auth
  };
};

export default connect(mapStateToStore, mapDispatchToProps)(ManageListingsComponent);
