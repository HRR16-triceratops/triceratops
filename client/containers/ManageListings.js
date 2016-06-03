import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import SingleListingItemEditable from '../components/SingleListingItemEditable';
import AddNewListingForm from './NewListingContainer';
import { toggleViewManageListings, toggleViewAddNewListingForm, fetchUpdatedProducts } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import SingleListingItemSimple from '../components/SingleListingItemSimple';
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
      <div className="manage">
        <div className="manageBanner">
        </div>
        <h1>Share Anything</h1>
        <h3>Why not earn some extra cash and help someone out by sharing your stuff!</h3>
        <RaisedButton label="Create New Listing" style={{margin:'8px 5px 0 0'}}
          onClick={()=>{
            // // fetch newState data
            // dispatch(fetchManageListingsState());
            // toggles view of form!
            dispatch(toggleViewAddNewListingForm());
          }} />
        <RaisedButton  style={{margin:'8px 5px 0 0'}}
        label={viewManagedListing ? 'Hide Your Current Shares' : 'Show Your Current Shares'}
        onClick={()=>{
          dispatch(toggleViewManageListings());
        }} />  
        {viewAddNewListingForm ?
          <AddNewListingForm
            isAttemptingToAdd={isAttemptingToAdd}
          /> : null}
        <div className='editShares'>
        {viewManagedListing ? rentedItems.map((item, ind)=>{
          return <SingleListingItemSimple
            key={ind}
            editing={true}
            item={item}
            dispatch={dispatch.bind(this)}
            isItemPendingRemoval={ListingsPendingRemoval.hasOwnProperty(item._id)}
          />;
        }): null}
        </div>
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
