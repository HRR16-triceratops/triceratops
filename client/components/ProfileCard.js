import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

export default class ProfileCard extends Component{

  constructor(props){
    super(props);
  }

  renderProfile(){
    if(this.props.cardType === "profile"){
      return (
        <Card className="profileCards" initiallyExpanded={true}>
          <CardHeader
            title={"Profile"}
            subtitle={"Edit email, password ..."}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
            {this.props.cardType === "profile"}
            <p><strong>Username:</strong> {this.props.user.username}</p>
            <p><strong>Email:</strong> {this.props.user.email}</p>
          </CardText>
          <CardActions expandable={true} style={{paddingTop: 0}}>
          </CardActions>
        </Card>
      )
    }
  }

  renderListings(){
    if(this.props.cardType === 'listings'){
      return (
        <Card className="profileCards" initiallyExpanded={this.props.expanded}>
          <CardHeader
            title={"Your Listings"}
            subtitle={"View and manage your listings"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
            {
              this.props.products.items.filter(item => {
                return item.author === this.props.user.username;
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
          </CardText>
          <CardActions expandable={true} style={{paddingTop: 0}}>
            <Link to={"/Manage/"}>
              <FlatButton label={"Manage your listings"} />
            </Link>
          </CardActions>
        </Card>
      )
    }
  }


  renderRentals(){
    if(this.props.cardType === "rentals"){
      return (
        <Card className="profileCards" initiallyExpanded={this.props.expanded}>
          <CardHeader
            title={"Upcoming Rentals"}
            subtitle={"Check out the details of your upcoming rentals"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
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
          </CardText>
          <CardActions expandable={true} style={{paddingTop: 0}}>
          </CardActions>
        </Card>
      )
    }
  }
  render(){
    return(
      <div>
        <div>
          {this.renderProfile()}
        </div>
        <div>
          {this.renderListings()}
        </div>
        <div>
          {this.renderRentals()}
        </div>
      </div>
    )

  }
};
