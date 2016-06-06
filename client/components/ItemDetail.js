import React from 'react';
import { Component } from 'react';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import RentDateComponenet from '../containers/RentDateContainer';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MapComponenet from './Map.js';

class ItemDetailComponent extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    if(!this.props.auth.isAuthenticated) {
      return this.props.redirectToLogin();
    } else {
      this.props.fetchUpdatedProducts(this.props.params.itemId);
    }
  }

  render(){
    const { item, user, ui, popupClose, setMapCenter, postComment }  = this.props;
    console.log('item', item);
    return (
      <div>
        <div className="productBanner">
          <div className='productBody col-md-7'>
            <Paper zDepth={3}  className='productImage'>
                <span></span>
                <img src={item.imgURL} />
            </Paper>
          </div>
          <div className='productBody col-md-5'>
            <h3>{item.title}</h3>
            <p><b>Details: </b>{item.description}</p>
            <h3>${item.price}.00</h3>
            {item.author !== user.username ?
              <RentDateComponenet />
              : null
            }
            <p></p>
            <div id="map-container">
            {item.locationInfo ?
              <MapComponenet
                center={item.locationInfo.marker}
                draggable={false}
                setMapCenter={setMapCenter}
                setMarkerCenter={() => {}}
                findGeolcation={false}
                searchBox={false}
              /> : null
            }
            </div>
            <Dialog
              actions={
                <FlatButton
                  label="Ok"
                  primary={true}
                  onClick={popupClose}
                />
              }
              modal={false}
              open={ui.popup.open}
              onRequestClose={popupClose}
            >
              {ui.popup.content}
            </Dialog>
            
          </div>
        </div>
        <CommentList className="comments" item={item} user={user} postComment={postComment} productId={this.props.params.itemId}/>
      </div>
    );
  }
}

export default ItemDetailComponent;
