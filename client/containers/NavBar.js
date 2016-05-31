import React, { Component, PropTypes } from 'react'; 
import { connect } from 'react-redux'; 
import { Link } from 'react-router';

export default class NavBar extends Component {
  render() {
    // const { store, history } = this.props
    return (
      <div>
  			<ul>
  				<li><Link to="/listings">Show Listings</Link></li>
  				<li><Link to="/manage">Manage Listings</Link></li>
  				<li><Link to="/login">Login</Link></li>
          <li><Link to="/profile">User Profile</Link></li>
          <li><Link to='/testRoute'>For Testing Only</Link></li>
  			</ul>
      </div>
    )
  }
}

// Root.propTypes = {
//   store: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired
// }; 
