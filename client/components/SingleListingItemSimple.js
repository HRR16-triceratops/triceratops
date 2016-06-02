import React from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const SingleListingItemSimple = (props) => {
  return (
    <div className="col-md-4">
      <Card>
        <CardHeader
          title="Location"
          subtitle="Sharer"
          avatar="http://lorempixel.com/100/100/nature/"
        />
        <CardMedia
          overlay={<CardTitle title={props.item.title} subtitle="" />}
        >
          <img src={props.item.imgURL} />
        </CardMedia>
        <CardText>
          {props.item.description}
        </CardText>
        <CardActions>
          <Link to={"/listings/" + props.item._id}><FlatButton label="Show Details" /></Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default SingleListingItemSimple;
