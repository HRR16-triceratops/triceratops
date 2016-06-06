import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import ProfileCard from './ProfileCard.js';

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

  const { user, products } = this.props;

    return (
      <div>
        <ProfileCard 
          expanded={true} 
          title={"Profile"} 
          subtitle={"Edit email, password..."}
          displayName={user.username}
          email={user.email}
          linkTo={'/'}
          buttonLabel={"Edit Profile"}
        />
        <ProfileCard 
          expanded={false} 
          title={"Your Listings"} 
          subtitle={"View and manage your listings"}
          displayName={user.username}
          email={user.email}
          linkTo={'/manage'}
          buttonLabel={"Manage your listings"}
          listItems={
            products.items.filter(item => {
              return item.author === user.username;
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
        />
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
