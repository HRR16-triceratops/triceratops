import * as actions from '../actions/index.js';
import NewListingComponenet from '../components/NewListing.js';
import { reduxForm } from 'redux-form';

const mapDispatchToProps = (dispatch) => {
  return {
    addNewListing: (data) => {
      console.log('this is data', data);
      dispatch(actions.addNewListing(data));
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default reduxForm({
  form: 'NewListingForm',
  fields: [
    'type',
    'title',
    'summary',
    'description',
    'price',
    'availableFrom',
    'availableTo',
    'imgURL',
    'locationInfo'
  ]
}, mapStateToProps, mapDispatchToProps)(NewListingComponenet);
