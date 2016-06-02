import React from 'react';
import { Link } from 'react-router'; // for back button?
import { updateFormField } from '../actions/index';
import { addNewListing } from '../actions/index';

// ADD STATE MANAGEMENT REDUCERS.
// then add others.

const AddNewListingForm = (props) => {
  const { dispatch, fields, isAttemptingToAdd } = props;
  return (
    <div>
      <form onSubmit={
        (e)=>{
          console.log('submit button pressed!');
          e.preventDefault();
          dispatch(addNewListing(fields));
        }}>
      <h3>AddNewListingForm Component here!</h3>
      {isAttemptingToAdd ? <p>Adding new listing, please wait...</p> : null}
      {Object.keys(fields).map((fieldKey, ind)=>{
        return (
          <div key={ind}>
            {fieldKey}:<input title="TEST TITLE!" type="text"
              value={fields[fieldKey]}
              onChange={(e)=>{
                var fieldValue = e.target.value;
                dispatch(updateFormField(fieldKey, fieldValue));
              }}
            />
          </div>
          );
      })}
         <input type='submit' value='Post'/>
       </form>
    </div>
    );
};

export default AddNewListingForm;
