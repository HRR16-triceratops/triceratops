import * as types from '../constants/ActionTypes';
// import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// auth reducer
const auth = (state = {
  isAuthenticated: false,
  token: null
}, action) => {
  switch (action.type) {
    // assumes that JWT token is held in action.payload.
    case types.LOGIN_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      token: action.payload.token
    };
    case types.SIGNUP_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      token: action.payload.token
    };
    case types.VERIFY_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      token: action.payload.token
    };
    case types.LOGOUT:
    return {
      ...state,
      isAuthenticated: false,
      token: null
    };
    default:
    return state;
  }
};
const user = (state = {
  // id: 982380,
  // username: 'RogRog',
  // displayName: null,
  // email: null,
  // rentedItem: []
}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    return {
      ...state,
      username: action.payload.user.username,
      displayName: action.payload.user.displayName,
      email: action.payload.user.email
    };
    case types.SIGNUP_SUCCESS:
    return {
      ...state,
      username: action.payload.user.username,
      displayName: action.payload.user.displayName,
      email: action.payload.user.email
    };
    case types.VERIFY_SUCCESS:
    return {
      ...state,
      username: action.payload.user.username,
      displayName: action.payload.user.displayName,
      email: action.payload.user.email
    };
    case types.LOGOUT:
    return {
      ...state,
      username: null,
      displayName: null,
      email: null
    };
    default:
    return state;
  }
};

const products = (state = {
  items: [],
  filter: '',
  detail: {item: {}, disableDate: []}
}, action) => {
  switch (action.type) {
    case types.UPDATE_PRODUCTS_STATE:
    return {
      ...state,
      items: action.updatedProductsState
    }
    case types.UPDATE_PRODUCT_DETAIL:
    return {
      ...state,
      detail: {
        item: action.payload,
        disableDate: action.payload.rentSchedule.map(schedule => {
          return schedule.date;
        })
      }
    };
    case types.RENT_SUCCESS:
    return {
      ...state,
      detail: {
        item: action.payload,
        disableDate: action.payload.rentSchedule.map(schedule => {
          return schedule.date;
        })
      }
    };
    case types.RENT_FAILURE:
    return {
      ...state
    };
    case types.CANCEL_SUCCESS:
    return {
      ...state
    };
    case types.CANCEL_FAILURE:
    return {
      ...state
    };
    case types.REMOVELISTING_SUCCESS:
    let newItems = state.items.filter((item) => {
      return item._id !== action.itemId;
    });
    return {
      ...state,
      items: newItems
    }
    case types.ADDLISTING_SUCCESS:
    return {
      ...state,
      items: [
        ...state,
        action.newItem
      ]
    };
    default:
    return state;
  }
};

// state that's specific to a component, still stored in redux store,
// but simply namespaced to ui.(component).(state)
const ui = (state = {
  isAuthenticating: false,
  ManageListings: {
    viewManagedListing: false,
    viewAddNewListingForm: false
  },
  SingleListingItemEditable: {
    ListingsPendingRemoval: {
      /*  HASHTABLE
      1424: 1424,
      444: 444,
      109202: 109202
      */
    }
  },
  isAttemptingToAdd: false,
  cancelPopup: false,
  removePopup: false
}, action) => {
  switch (action.type) {
    case types.ADDLISTING_REQUEST:
    return {
      ...state,
      isAttemptingToAdd: true
    };
    // Refactor out duplication of two below, same ui result.
    case types.ADDLISTING_SUCCESS:
    return {
      ...state,
      isAttemptingToAdd: false
    };
    case types.ADDLISTING_FAILURE:
    return {
      ...state,
      isAttemptingToAdd: false
    };
    case types.REMOVELISTING_REQUEST:
    return {
      ...state,
      SingleListingItemEditable: {
        ...state.SingleListingItemEditable,
        ListingsPendingRemoval: {
          ...state.SingleListingItemEditable.ListingsPendingRemoval,
          [action.itemId]: action.itemId
        }
      }
    };
    case types.CANCELPOPUP_OPEN:
    return {
      ...state,
      cancelPopup: true
    };
    case types.CANCELPOPUP_CLOSE:
    return {
      ...state,
      cancelPopup: false
    };
    case types.REMOVEPOPUP_OPEN:
    return {
      ...state,
      removePopup: true
    };
    case types.REMOVEPOPUP_CLOSE:
    return {
      ...state,
      removePopup: false
    };
    // update pending list for UI state tree
    case types.REMOVELISTING_SUCCESS:
    var updatedListingsPendingRemoval = Object.assign({}, state
      .SingleListingItemEditable
      .ListingsPendingRemoval);
      delete updatedListingsPendingRemoval[action.itemId];
      return {
        ...state,
        SingleListingItemEditable: {
          ...state.SingleListingItemEditable,
          ListingsPendingRemoval: updatedListingsPendingRemoval
        }
      };

  // Refactor, as duplicates above code
    case types.REMOVELISTING_FAILURE:
    var updatedListingsPendingRemoval = Object.assign({}, state
    .SingleListingItemEditable
    .ListingsPendingRemoval);
    delete updatedListingsPendingRemoval[action.itemId];
    return {
      ...state,
      SingleListingItemEditable: {
        ...state.SingleListingItemEditable,
        ListingsPendingRemoval: updatedListingsPendingRemoval
      }
    };
    case types.UI_TOGGLE_VIEW_MANAGEDLISTING:
    return {
      ...state,
      ManageListings: {
        ...state.ManageListings,
        viewManagedListing: !state.ManageListings.viewManagedListing
      }
    };
    case types.UI_TOGGLE_VIEW_ADDNEWLISTINGFORM:
    return {
      ...state,
      ManageListings: {
        ...state.ManageListings,
        viewAddNewListingForm: !state.ManageListings.viewAddNewListingForm
      }
    };

    case types.LOGIN_REQUEST:
    return {
      ...state,
      isAuthenticating: true
    };
    case types.SIGNUP_REQUEST:
    return {
      ...state,
      isAuthenticating: true
    }
    default:
    return state;
  };
};

// need to add routing to handle route states syncing w/browser history ..
const rootReducer = combineReducers({
  form: formReducer,
  auth,
  user,
  ui,
  products,
  routing
});

export default rootReducer;
