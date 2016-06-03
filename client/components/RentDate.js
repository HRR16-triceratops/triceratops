import React from 'react';
import { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class RentDateComponent extends Component {
  constructor(props){
    super(props);
  }

  attemptRentitem(data) {
    data.username = this.props.user.username;
    this.props.attemptRentitem(data, this.props.item._id);
  }

  render(){
    const { fields, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.attemptRentitem.bind(this))}>
        <DatePicker
          autoOk={true}
          style={{width:'60%',float:'left'}}
          hintText="Pick a date..."
          onChange={(x, event) => fields.date.onChange(event)}
          minDate={new Date(this.props.item.availableFrom)}
          maxDate={new Date(this.props.item.availableTo)}
          shouldDisableDate={(date) => {
            return this.props.disableDate.indexOf(date.toString()) !== -1;
          }}
        />
        <RaisedButton type="submit" label="Rent" style={{float:'right'}} />
      </form>
    );
  }
}

export default RentDateComponent;
