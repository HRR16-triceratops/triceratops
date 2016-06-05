import React from 'react';
import { Link } from 'react-router'; // for back button?
import { updateFormField } from '../actions/index';
import { addNewListing } from '../actions/index';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {blueGrey500} from 'material-ui/styles/colors';
import MapComponenet from './Map.js';
import MapSearchBoxComponenet from './MapSearchBox.js';

const errorStyle = {
    color: blueGrey500
  };

const NewListingComponenet = (props) => {
  const { fields, handleSubmit, resetForm, isAttemptingToAdd, mapUpdate, ui } = props;
  return (
    <div>
      <form className='addForm' onSubmit={handleSubmit(props.addNewListing)}>
      {isAttemptingToAdd ? <p>Adding new listing, please wait...</p> : null}
        <ul style={{listStyle:'none', background:'rgba(255,255,255,0.8)'}}>
          <li><TextField hintStyle={errorStyle} hintText={'Type'} {...fields.type}/>
          <TextField hintStyle={errorStyle} hintText={'Title'} {...fields.title}/></li>
          <li><TextField hintStyle={errorStyle} fullWidth={true} hintText={'Summary'} {...fields.summary}/></li>
          <li><TextField hintStyle={errorStyle} fullWidth={true} multiLine={true} rows={2} hintText={'Description'} {...fields.description}/></li>
          <li><TextField hintStyle={errorStyle} hintText={'Price'} {...fields.price}/></li>
          <li><DatePicker
            autoOk={true}
            hintStyle={errorStyle}
            hintText="Available From"
            onChange={(x, event) => fields.availableFrom.onChange(event)}
          /><DatePicker
            autoOk={true}
            hintStyle={errorStyle}
            hintText="Available To"
            onChange={(x, event) => fields.availableTo.onChange(event)}
          /></li>
          <li><TextField hintStyle={errorStyle} fullWidth={true} hintText={'Image Url'} {...fields.imgURL}/></li>

          <li><TextField hintStyle={errorStyle} hintText={'Location Info'} {...fields.locationInfo}/>
            <RaisedButton backgroundColor='cyan50' primary={true} style={{float:'right'}} label="Share" type="submit"/>
          </li>
        </ul>
      </form>
      <div id="map-container">
      <MapComponenet center={ui.location}/>
      </div>
      <MapSearchBoxComponenet placeholder={'Search!'} onPlacesChanged={mapUpdate}/>
    </div>
    );
};

export default NewListingComponenet;
