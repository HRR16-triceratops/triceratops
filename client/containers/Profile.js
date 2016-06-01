import { Component } from 'react';
import React from 'react'; 
import { Link } from 'react-router'; 
import { connect } from 'react-redux'; 

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

// const Profile = connect(mapStateToProps)(Profile); 

export default Profile; 