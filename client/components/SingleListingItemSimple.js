import React from 'react'; 
import { Link } from 'react-router'; 

// Refactor out to even smaller components! 
// Use props to populate relevant component info e.g. img src url, Link pointer, 
// blurb with title, etc. 

const SingleListingItemSimple = (props) => {
	return (
		<div className="col-md-4">
			<h3>Item: {props.item.title}</h3>
			<img src="http://bit.ly/1UrCXd2"/>
			<p><b>Description: </b>{props.item.description}</p>
			<button><Link to={"/listings/" + props.item.id}>Show Details</Link></button>
		</div>
		)
};

export default SingleListingItemSimple;