import { Component } from 'react';
import React from 'react'; 
import { Link } from 'react-router'; 

class Profile extends Component {

	constructor(props){
		super(props);
	}

	render(){
		return (
				<div>
					<div>Profile component here</div>
					<button><Link to="/manage">Manage your Listings</Link></button>
				</div>
			)
	}
}

export default Profile; 