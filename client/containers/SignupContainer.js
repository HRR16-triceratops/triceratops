import * as actions from '../actions/index.js';
import SignupComponent from '../components/signup.jsx';
import { reduxForm } from 'redux-form';

const mapDispatchToProps = (dispatch) => {
  return {
    popupClose: () => {
      dispatch(actions.popupClose());
    },
    makeSignupRequest: (userData) => {
      dispatch(actions.attemptSignup(userData));
    },
    resetMe: () =>{
      //sign up is not reused, so we dont need to resetUserFields
      //in our case, it will remove authenticated users
       // dispatch(resetUserFields());
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    token: state.auth.token,
    ui: state.ui
  };
}

export default reduxForm({
  form: 'SignupForm',
  fields: ['username', 'email', 'password']
}, mapStateToProps, mapDispatchToProps)(SignupComponent);
