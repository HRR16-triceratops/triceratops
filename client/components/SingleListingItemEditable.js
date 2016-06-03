import React from 'react';
import { Link } from 'react-router';
import SingleListingItemSimple from './SingleListingItemSimple';
import { removeRentedItem } from '../actions/index';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  marginRight: 20,
  zIndex:3
};
//*************** added conditional checks to SingleListingItemSimple
//*************** this file is no longer being used.
// Refactor to add confirmation step before removal.
// Refactor to add additional 'edit' button to edit existing postings (remove noscript tag).
const SingleListingItemEditable = (props) => {
  const { dispatch, item, isItemPendingRemoval } = props;
  return (
    <div>
      <SingleListingItemSimple 
      item={item} 
      editing={true} 
      dispatch={dispatch}
      pending={isItemPendingRemoval}  
      />
    </div>
    );
};

export default SingleListingItemEditable;
