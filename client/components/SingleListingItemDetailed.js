import React from 'react';
import { Component } from 'react';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';

const style = {
  height: 500,
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  overflow: 'hidden',
  position: 'relative'
};

// WARNING!
// Move this, as this appears to be a Container.
// Move to containers folder, update all pathnames/pointers

class SingleListingItemDetailed extends Component {
  constructor(props){
    super(props);
  }

  render(){
    // Refactor - change description to longDescription if included in individual Product schema
    const { item } = this.props;
    return (
      <div>
        <div className="productBanner">
          <div className='productBody col-md-7'>
            <Paper zDepth={3}  style={style}>
                <img src={item.imgURL} style={{width:'100%', height:'auto'}} />
            </Paper>
          </div>
          <div className='productBody col-md-5'>
            <h3>{item.title}</h3>
            <p><b>Details: </b>{item.description}</p>
            <h3>${item.price}.00</h3>
            <DatePicker style={{width:'60%',float:'left'}} hintText="Pick a date..." />
              <RaisedButton label="Rent" style={{float:'right'}}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps){
  return {
    item: state.products.filter((item)=>{
      return item._id === ownProps.params.itemId;
    })[0]
  };
};

export default connect(mapStateToProps)(SingleListingItemDetailed);
