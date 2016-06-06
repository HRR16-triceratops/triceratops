import React from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
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
        <p><strong>Username:</strong> {props.displayName}</p>
        <p><strong>Email:</strong> {props.email}</p>
      </CardText>
      <CardActions expandable={true} style={{paddingTop: 0}}>
        <FlatButton label={props.buttonLabel} />
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
