import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import ItemDetailComponent from '../components/ItemDetail.js';
import { push } from 'react-router-redux';
import helper from '../services/helper.js';

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToLogin: () => {
      dispatch(push('/login'));
    },
    fetchUpdatedProducts: (id) => {
      dispatch(actions.fetchUpdatedProducts(id));
    },
    popupClose: () => {
      dispatch(actions.popupClose());
    },
    setMapCenter: (center) => {
      dispatch(actions.setMapCenter(center));
    },
    // have to build out action and update reducers, ... 
    postComment: (author, date, content, productId) => {
      dispatch(actions.addNewComment(author, date, content, productId));
      // console.log('id is: ' + author + ' and date is ' + date + ' and content is' + content + ' and productid is' + productId);
    }
  };
};

const mapStateToProps = function(state){
  return {
    item: state.products.detail.item,
    user: state.user,
    auth: state.auth,
    ui: state.ui
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailComponent);
