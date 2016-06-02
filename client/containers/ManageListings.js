import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import SingleListingItemEditable from '../components/SingleListingItemEditable';
import AddNewListingForm from './NewListingContainer';
import { toggleViewManageListings, toggleViewAddNewListingForm, fetchUpdatedProducts } from '../actions/index';

// Refactor so that this container doesn't even render a single raw html elemnt like div.
// outsource all view space to presentational components.
class ManageListings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // ajax requests
    this.props.dispatch(fetchUpdatedProducts());
  }

  render() {
    const { viewManagedListing, viewAddNewListingForm } = this.props.ui.ManageListings;
    const isAttemptingToAdd = this.props.ui.isAttemptingToAdd;
    const { ListingsPendingRemoval } = this.props.ui.SingleListingItemEditable;
    const { dispatch, rentedItems } = this.props;

    return (
      <div>
        <h3>ManageListings Component here!</h3>
        <button onClick={()=>{
          // // fetch newState data
          // dispatch(fetchManageListingsState());
          // toggles view of form!
          dispatch(toggleViewAddNewListingForm());
        }}>
        Create New Listing
        </button>
        {viewAddNewListingForm ?
          <AddNewListingForm
            isAttemptingToAdd={isAttemptingToAdd}
          /> : null}

          <button onClick={()=>{
            dispatch(toggleViewManageListings());
          }}>
          {viewManagedListing ? 'Hide' : 'Show'} Items being listed
          </button>

          {viewManagedListing ? rentedItems.map((item, ind)=>{
            return <SingleListingItemEditable
              key={ind}
              item={item}
              dispatch={dispatch.bind(this)}
              isItemPendingRemoval={ListingsPendingRemoval.hasOwnProperty(item._id)}
            />;
          }): null}
      </div>
    );
  }
}

const mapStateToStore = (state) => {
  return {
    rentedItems: state.products.items.filter((item) => {
      // assuming unique usernames
      return item.author === state.user.username;
    }),
    ui: state.ui
  };
};

export default connect(mapStateToStore)(ManageListings);
