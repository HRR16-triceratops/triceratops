import React from 'react'; 
import { Component } from 'react'; 

// WARNING! 
// Move this, as this appears to be a Container. 
// Move to containers folder, update all pathnames/pointers

class SingleListingItemDetailed extends Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		console.log('make AJAX request here using props.params.itemId!');
	}

	render(){
		return (
				<div>
					<h3>Item ID: {this.props.params.itemId}</h3>
					<h3>Title: Some Item</h3>
					<p><b>Description: </b>An item description that will grab and fascinate you enough to persuade you to rent the relevant good!</p>
				</div>
			)
	}
} 

export default SingleListingItemDetailed;