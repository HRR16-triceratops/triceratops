import React from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { removeRentedItem } from '../actions/index';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  marginLeft: 20,
};

const SingleListingItemSimple = (props) => {
  return (
    <div className="productCard col-md-4">
      <Card>
        {/* CardHeader should contain Location info */}
        <CardHeader
          title={props.item.locationInfo.city} // Location info
          subtitle={props.item.author.displayName}
          avatar="http://lorempixel.com/100/100/nature/"
        />
        <CardMedia
          style={{height:'350px'}}
          overlay={<CardTitle title={props.item.title} subtitle="" />}
        >
          <img style={{width:'100%', maxHeight:'350px'}} src={props.item.imgURL} />
        </CardMedia>
        <CardText>
          {props.item.summary}
        </CardText>
        <CardActions>
          <Link to={"/listings/" + props.item._id}><FlatButton label="Show Details" /></Link>
          {props.editing ?
          <FloatingActionButton secondary={true}
            onClick={()=>{props.dispatch(removeRentedItem(props.item));}}
          >
            {props.pending ? <CircularProgress /> : <ContentRemove style={style}/>}
          </FloatingActionButton>
           : null}
        </CardActions>
      </Card>
    </div>
  );
};

export default SingleListingItemSimple;
