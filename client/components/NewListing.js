import React from 'react';
import { Link } from 'react-router'; // for back button?
import { updateFormField } from '../actions/index';
import { addNewListing } from '../actions/index';

const NewListingComponenet = (props) => {
  const { fields, handleSubmit, resetForm, isAttemptingToAdd } = props;
  return (
    <div>
      <form onSubmit={handleSubmit(props.addNewListing)}>
      <h3>Share your Hot Tub!!</h3>
      {isAttemptingToAdd ? <p>Adding new listing, please wait...</p> : null}
      {Object.keys(fields).map((fieldKey, ind)=>{
        return (
          <div key={ind}>
            {fieldKey} : <input title="TEST TITLE!" type="text"
              {...fields[fieldKey]}
            />
          </div>
          );
      })}
         <button class="btn btn-success-outline" type="submit">Post</button>
       </form>
    </div>
    );
};

export default NewListingComponenet;
