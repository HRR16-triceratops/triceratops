import * as types from '../constants/ActionTypes';

/**
 *  Reducer related to UI
 */
export default (state = {
  ManageListings: {
    viewAddNewListingForm: false // State to toggle 'CREATE NEW LISTING' form
  },
  isAttemptingToAdd: false,      // Utilize it for Spinner
  popup: {                       // State for Popup
    content: '',                 // Actual Comment on Popup
    open: false,                 // Toggle Popup
    type: ''                     // Indicate Popup type('remove', 'cancel', '') *'' means general popup
  },
  location: {                    // Location for Google map(Being used only for Posting new item)
    lat: 27.28,
    lng: 153.1
  }
}, action) => {
  switch (action.type) {
    case types.SETMAPCENTER:
    return {
      ...state,
      location: {
        ...state.location,
        lat: action.payload.lat,
        lng: action.payload.lng
      }
    };

    // Set Marker on Map
    case types.SETMARKERCENTER:
    return {
      ...state,
      location: {
        ...state.location,
        marker: {
          lat: action.payload.lat,
          lng: action.payload.lng
        }
      }
    };
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
    case types.RENT_SUCCESS:
    return {
      ...state,
      popup: {
        content: 'Rent Success',
        open: true
      }
    };
    case types.POPUP_CLOSE:
    return {
      ...state,
      popup: {
        content: '',
        open: false,
        type: ''
      }
    };
    case types.POPUP_OPEN:
    return {
      ...state,
      popup: {
        content: action.payload.content,
        open: true,
        type: action.payload.type
      }
    };

    case types.UI_TOGGLE_VIEW_ADDNEWLISTINGFORM:
    return {
      ...state,
      ManageListings: {
        viewAddNewListingForm: !state.ManageListings.viewAddNewListingForm
      }
    };
    default:
    return state;
  };
};
