import { Component } from 'react';
import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class Profile extends Component {

	constructor(props){
		super(props);
	}

  componentWillMount() {
    if(!this.props.auth.isAuthenticated) {
      console.log('what are you doing?');
      browserHistory.push('/login');
    }
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
