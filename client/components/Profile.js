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
      return this.props.redirectToLogin();
    } else {
      this.props.fetchUpdatedProducts();
    }
  }

  render(){
    return (
        <div>
          <h3>Welcome {this.props.user.displayName}!!</h3>
          <div>Profile component here</div>
          <p>Username : {this.props.user.displayName}</p>
          <p>Email : {this.props.user.email}</p>
          <button><Link to="/manage">Manage your Listings</Link></button>
          <ul>
            {
              this.props.products.map(item => {
                return <li key={item._id}>{item.title} / {item.summary} / {item.price} </li>
              })
            }
          </ul>
        </div>
      );
  }
}

export default Profile;
