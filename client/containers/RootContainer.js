import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import RootComponent from '../components/Root.js';

const mapDispatchToProps = (dispatch) => {
  return {
    attemptVerify: () => {
      let token = window.localStorage.getItem('jwtToken');

      // If there is no token, do nothing
      if(!token || token === '') {
        return;
      }
      dispatch(actions.attemptVerify(token));
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    token: state.auth.token
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);
