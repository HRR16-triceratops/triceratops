import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import MapComponent from '../components/Map.js';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdatedProducts: () => {
      dispatch(actions.fetchUpdatedProducts());
    },
    resetSearch: () => {
      dispatch(actions.search({search: ''}));
    },
    setMapCenter: (center) => {
      dispatch(actions.setMapCenter(center));
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    products: state.products
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
