import React from 'react'; 
import { Link } from 'react-router'; 
import SingleListingItemSimple from './SingleListingItemSimple'; 
import { removeRentedItem } from '../actions/index'; 
  
// Refactor to add confirmation step before removal.
// Refactor to add additional 'edit' button to edit existing postings (remove noscript tag). 
const SingleListingItemEditable = (props) => {
	const { dispatch, item, isItemPendingRemoval } = props;
	return (
		<div>
			<SingleListingItemSimple item={item} />
			{isItemPendingRemoval ? <div>Item is Pending Removal...</div> : null}
			<noscript><button>Edit</button></noscript>
			<button onClick={()=>{dispatch(removeRentedItem(item))}}>Remove</button>
		</div>
		); 
};

export default SingleListingItemEditable;