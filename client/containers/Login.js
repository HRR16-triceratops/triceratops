import * as actions from '../actions/index.js';
import LoginComponent from '../components/login.jsx';
import { reduxForm } from 'redux-form';

console.log('Login page loaded!');

const mapDispatchToProps = (dispatch) => {
  return {
    makeLoginRequest: (userData) => {
      dispatch(actions.attemptLogin(userData));
    },
    loginWithFB: (resp) => {
      console.log(resp);
      if(resp.id && resp.accessToken) {
        let username = 'facebook:' + resp.id;
        let displayName = resp.name;
        let email = resp.email;
        dispatch(actions.attemptSocialLogin({
          username: username,
          displayName: displayName,
          email: email,

          // It should be changed!
          password: 'null'
        }));
      }
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['username', 'password']
}, mapStateToProps, mapDispatchToProps)(LoginComponent);
