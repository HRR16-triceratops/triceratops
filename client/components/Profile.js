import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class ProfileComponent extends Component {

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
          <h4>Your Sharing List</h4>
            {
              this.props.products.items.filter(item => {
                return item.author === this.props.user.username;
              }).map(item => {
                return <li key={item._id}>{item.title} / {item.summary} / {item.price} </li>;
              })
            }
          </ul>
          <ul>
          <h4>Upcoming Rent</h4>
            {
              this.props.products.items.filter(item => {
                return item.rentSchedule.length === 0 ? false : item.rentSchedule[0].username === this.props.user.username;
              }).map(item => {
                return <li key={item._id}>{item.title} / {item.summary} / {item.price} </li>;
              })
            }
          </ul>
        </div>
      );
  }
}

export default ProfileComponent;
