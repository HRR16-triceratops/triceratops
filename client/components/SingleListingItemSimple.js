import React from 'react'; 
import { Link } from 'react-router'; 
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// Refactor out to even smaller components! 
// Use props to populate relevant component info e.g. img src url, Link pointer, 
// blurb with title, etc. 

const SingleListingItemSimple = (props) => {
	return (
		<div className="col-md-4">
      <Card>
        <CardHeader
          title="Location"
          subtitle="Sharer"
          avatar="http://lorempixel.com/100/100/nature/"
        /><CardMedia
          overlay={<CardTitle title={props.item.title} subtitle="" />}
        ><img src={props.item.img} />
        </CardMedia>
        <CardText>
          {props.item.description}
        </CardText>
        <CardActions>
          <Link to={"/listings/" + props.item.id}><FlatButton label="Show Details" /></Link>
        </CardActions>
      </Card>
		</div>
		)
};

export default SingleListingItemSimple;