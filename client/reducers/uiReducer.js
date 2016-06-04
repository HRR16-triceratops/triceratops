import * as types from '../constants/ActionTypes';

export default (state = {
  isAuthenticating: false,
  ManageListings: {
    viewManagedListing: false,
    viewAddNewListingForm: false
  },
  isAttemptingToAdd: false,
  cancelPopup: false,
  removePopup: false,
  generalPopup: {
    content: '',
    open: false
  }
}, action) => {
  switch (action.type) {
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
    case types.RENT_SUCCESS:
    return {
      ...state,
      generalPopup: {
        content: 'Rent Success',
        open: true
      }
    };
    case types.GENERALPOPUP_CLOSE:
    return {
      ...state,
      generalPopup: {
        content: '',
        open: false
      }
    };
    case types.GENERALPOPUP_OPEN:
    return {
      ...state,
      generalPopup: {
        content: action.payload,
        open: true
      }
    };
    // update pending list for UI state tree
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
    default:
    return state;
  };
};
