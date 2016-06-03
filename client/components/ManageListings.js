import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import SingleListingItemEditable from './SingleListingItemEditable';
import AddNewListingForm from '../containers/NewListingContainer';
import { toggleViewManageListings, toggleViewAddNewListingForm, fetchUpdatedProducts } from '../actions/index';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/index.js';

// Refactor so that this container doesn't even render a single raw html elemnt like div.
// outsource all view space to presentational components.
class ManageListingsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // ajax requests
    this.props.fetchUpdatedProducts();
  }

  render() {
    const { viewManagedListing, viewAddNewListingForm } = this.props.ui.ManageListings;
    const isAttemptingToAdd = this.props.ui.isAttemptingToAdd;
    const { ListingsPendingRemoval } = this.props.ui.SingleListingItemEditable;
    const { dispatch, sharingItems } = this.props;
    const upcomingRent = this.props.upcomingRent();
    console.log('upcoming rent', upcomingRent);

    const handleRemove = (item) => {
      this.props.removeItem(item);
    };

    const handleCancel = (item) => {
      console.log('cancel button clicked');
      this.props.cancelItem(item);
    };

    return (
      <div>
        <h3>ManageListings Component here!</h3>
        <button onClick={()=>{
          this.props.toggleViewAddNewListingForm();
        }}>
        Create New Listing
        </button>
        {viewAddNewListingForm ?
          <AddNewListingForm
            isAttemptingToAdd={isAttemptingToAdd}
          /> : null}
        <p></p>
        <h3>All the Items You shared!</h3>
        <List>
          {sharingItems.map((item, i)=>{
            return (
              <div key={i}>
                <ListItem
                  primaryText={item.title + ' : ' + item.description}
                  secondaryText={item.description}
                />
                <RaisedButton label="Remove" type="button" onClick={handleRemove.bind(null, item)} />
                {/*isItemPendingRemoval={ListingsPendingRemoval.hasOwnProperty(item._id)}*/}
              </div>
            );
          })}
        </List>
        <p></p>
        <h3>Upcoming Rent!! Ready to go!</h3>
        <List>
          {upcomingRent.map((item, i)=>{
            return (
              <div key={i}>
                <ListItem
                  primaryText={item.title + ' : ' + item.description}
                  secondaryText={item.schedule.date.substring(0, 10)}
                />
                <RaisedButton label="Cancel" type="button" onClick={handleCancel.bind(null, item)} />
                {/*isItemPendingRemoval={ListingsPendingRemoval.hasOwnProperty(item._id)}*/}
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

export default ManageListingsComponent;
