import * as actions from '../actions/index.js';
import SearchComponent from '../components/Search.jsx';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => {
      console.log('send query!', query);
      dispatch(actions.search(query));
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    auth: state.auth
  };
}

export default reduxForm({
  form: 'SearchForm',
  fields: ['search']
}, mapStateToProps, mapDispatchToProps)(SearchComponent);
