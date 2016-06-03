import React from 'react';
import { Component } from 'react';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import RentDateComponenet from '../containers/RentDateContainer';

const style = {
  height: 500,
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  overflow: 'hidden',
  position: 'relative'
};

class ItemDetailComponent extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.fetchUpdatedProducts(this.props.params.itemId);
  }

  render(){
    const item = this.props.item;
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
            <RentDateComponenet />
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetailComponent;
