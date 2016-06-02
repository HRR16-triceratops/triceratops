import React from 'react';
import { Link } from 'react-router'; // for back button?
import { updateFormField } from '../actions/index';
import { addNewListing } from '../actions/index';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

const NewListingComponenet = (props) => {
  const { fields, handleSubmit, resetForm, isAttemptingToAdd } = props;
  return (
    <div>
      <form onSubmit={handleSubmit(props.addNewListing)}>
      <h3>Share your Hot Tub!!</h3>
      {isAttemptingToAdd ? <p>Adding new listing, please wait...</p> : null}
        <ul>
          <li><TextField hintText={'Type'} {...fields.type}/></li>
          <li><TextField hintText={'Title'} {...fields.title}/></li>
          <li><TextField hintText={'Summary'} {...fields.summary}/></li>
          <li><TextField hintText={'Description'} {...fields.description}/></li>
          <li><TextField hintText={'Price'} {...fields.price}/></li>
          <li><DatePicker
            autoOk={true}
            hintText="Available From"
            onChange={(x, event) => fields.availableFrom.onChange(event)}
          /></li>
          <li><DatePicker
            autoOk={true}
            hintText="Available To"
            onChange={(x, event) => fields.availableTo.onChange(event)}
          /></li>
          <li><TextField hintText={'Image Url'} {...fields.imgURL}/></li>
          <li><TextField hintText={'Location Info'} {...fields.locationInfo}/></li>
        </ul>
        <RaisedButton label="Post" type="submit"/>
      </form>
    </div>
    );
};

export default NewListingComponenet;
