import React from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

const ProfileCard = (props) => {
  
  return (
    <Card className="profileCards" initiallyExpanded={props.expanded}>
      <CardHeader
        title={props.title}
        subtitle={props.subtitle}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
        <List style={{paddingTop: 0}}>
          {
            props.listItems
          }
        </List>
      </CardText>
      <CardActions expandable={true} style={{paddingTop: 0}}>
        <Link style={{paddingTop: 0}} to={props.linkTo}>
          <FlatButton style={{paddingTop: 0}} label={props.buttonLabel} />
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
