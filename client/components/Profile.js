import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

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
        <Card className="profileCards" initiallyExpanded={true}>
          <CardHeader
            title="Profile"
            subtitle="Edit email, password ..."
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
            <p><strong>Username:</strong> {this.props.user.displayName}</p>
            <p><strong>Email:</strong> {this.props.user.email}</p>
          </CardText>
          <CardActions expandable={true} style={{paddingTop: 0}}>
            <FlatButton label="Edit Profile" />
          </CardActions>
        </Card>
        <Card className="profileCards">
          <CardHeader
            title="Your Listings"
            subtitle="View and manage your listings"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
            <List style={{paddingTop: 0}}>
              {
                this.props.products.items.filter(item => {
                  return item.author.username === this.props.user.username;
                }).map(item => {
                  return (
                     <Link to={"/listings/" + item._id}>
                            <ListItem
                              key={item._id}
                              primaryText={item.title}
                              secondaryText={"$"+item.price + " - " + item.summary}
                            />
                     </Link>
                  )
                })
              }
            </List>
          </CardText>
          <CardActions expandable={true} style={{paddingTop: 0}}>

            <Link style={{paddingTop: 0}}to="/manage">
              <FlatButton style={{paddingTop: 0}} label="Manage your listings" />
            </Link>
          </CardActions>
        </Card>
        <Card className="profileCards">
          <CardHeader
            title="Upcoming Rentals"
            subtitle="Check out the details of your upcoming rentals"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <List style={{paddingTop: 0}}>
              {
                this.props.products.items.filter(item => {
                  return item.rentSchedule.length === 0 ? false : item.rentSchedule[0].username === this.props.user.username;
                }).map(item => {
                  return (
                     <Link to={"/listings/" + item._id}>
                            <ListItem
                              key={item._id}
                              primaryText={item.title}
                              secondaryText={"$"+item.price + " - " + item.summary}
                            />
                     </Link>
                  )
                })
              }
            </List>
          </CardText>
        </Card>
      </div>
      );
  }
}

export default ProfileComponent;
