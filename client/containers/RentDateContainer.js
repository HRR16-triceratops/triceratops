import * as actions from '../actions/index.js';
import RentDateComponenet from '../components/RentDate.js';
import { reduxForm } from 'redux-form';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    attemptRentitem: (data, id) => {
      dispatch(actions.attemptRentitem(data, id));
    }
  };
};

function mapStateToProps(state) {
  return {
    item: state.products.detail.item,
    user: state.user,

    // Check occupied date from product detail
    disableDate: state.products.detail.disableDate.map(date => {
      return (new Date(date)).toString();
    })
  };
}

export default reduxForm({
  form: 'RentDateForm',
  fields: [
    'date'
  ]
}, mapStateToProps, mapDispatchToProps)(RentDateComponenet);
