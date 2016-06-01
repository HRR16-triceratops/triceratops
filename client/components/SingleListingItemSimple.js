import React from 'react'; 
import { Link } from 'react-router'; 

// Refactor out the noscript tags and replace with working img tags. 
// Remove pre/testing tags
const SingleListingItemSimple = (props) => {
	return (
		<div>
			<h3>Item: {props.item.title}</h3>
			<noscript><img src="http://bit.ly/1UrCXd2"/></noscript>
			<p><b>Description: </b>{props.item.description}</p>
			<button><Link to={"/listings/" + props.item.id}>Show Details</Link></button>
		</div>
		)
};

export default SingleListingItemSimple;