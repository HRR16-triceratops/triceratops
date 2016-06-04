import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SingleListingItemEditable from './SingleListingItemEditable';
import AddNewListingForm from '../containers/NewListingContainer';
import { toggleViewManageListings, toggleViewAddNewListingForm, fetchUpdatedProducts } from '../actions/index';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/index.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
      <div className="manage">
        <div className="manageBanner" />
          <h1>Share Anything</h1>
          <h3>Why not earn some extra cash and help someone out by sharing your stuff!</h3>
          <RaisedButton label="Create New Listing" style={{margin:'8px 5px 0 0'}}
          onClick={()=>{
            this.props.toggleViewAddNewListingForm();
          }} />

        {viewAddNewListingForm ?
          <AddNewListingForm
            isAttemptingToAdd={isAttemptingToAdd}
          /> : null}
        <hr />
        <h3>Your Shared Items</h3>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Item</TableHeaderColumn>
                <TableHeaderColumn>Summary</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
                <TableHeaderColumn>Remove?</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
          {sharingItems.map((item, i)=>{
            return (
              <TableRow key={i}>
                <TableRowColumn><Link to={"/listings/" + item._id}>{item.title}</Link></TableRowColumn>
                <TableRowColumn>{item.summary}</TableRowColumn>
                <TableRowColumn>{'$'+item.price + '.00'}</TableRowColumn>
                <TableRowColumn><RaisedButton onClick={handleRemove.bind(null, item)} label="Remove Listing" secondary={true}/></TableRowColumn>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
        <hr />
        <h3>Upcoming Rentals</h3>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Item</TableHeaderColumn>
                <TableHeaderColumn>Summary</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>Cancel?</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
          {upcomingRent.map((item, i)=>{
            return (
              <TableRow key={i}>
                <TableRowColumn><Link to={"/listings/" + item._id}>{item.title}</Link></TableRowColumn>
                <TableRowColumn>{item.summary}</TableRowColumn>
                <TableRowColumn>{'$'+item.price + '.00'}</TableRowColumn>
                <TableRowColumn>{item.schedule.date.substring(0, 10)}</TableRowColumn>
                <TableRowColumn><RaisedButton onClick={handleCancel.bind(null, item)} label="Cancel Rental" secondary={true}/></TableRowColumn>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ManageListingsComponent;
