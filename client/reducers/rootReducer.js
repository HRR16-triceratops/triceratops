import * as types from '../constants/ActionTypes';
// import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// auth reducer
const auth = (state = {
    isAuthenticated: false,
    token: null,
    user: null
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

// user reducer
// remember to remove fake username for lols
// NEEDS ID PROPERTY! 
const user = (state = {
    id: 982380,
    username: 'RogRog',
    displayName: null,
    email: null,
    rentedItem: []
}, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                username: action.payload.user.username,
                displayName: action.payload.user.displayName,
                email: action.payload.user.email
                    // ,sharingHistory: action.payload.user.sharingHistory
            };
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                username: action.payload.user.username,
                displayName: action.payload.user.displayName,
                email: action.payload.user.email
                    // ,sharingHistory: action.payload.user.sharingHistory
            };
        case types.VERIFY_SUCCESS:
            return {
                ...state,
                username: action.payload.user.username,
                displayName: action.payload.user.displayName,
                email: action.payload.user.email
                    // ,sharingHistory: action.payload.user.sharingHistory
            };
        case types.LOGOUT:
            return {
                ...state,
                username: null,
                displayName: null,
                email: null
                    // ,sharingHistory: null
            };
        default:
            return state;
    }
};

// remember to replace products back with empty array for initial state value
const fakeProductsList = [{
    id: 510,
    type: 'chair',
    title: 'Amazing chair',
    description: 'Beautifully handcrafted chair',
    price: 10,
    locationInfo: 'Australia',
    author: 'RogRog'
}, {
    id: 512,
    type: 'table',
    title: 'Amazing table',
    description: 'Wonderful handwoven table',
    price: 40,
    locationInfo: 'Melbourne',
    author: 'M172'
}, {
    id: 514,
    type: 'table',
    title: 'Amazing table',
    description: 'Wonderful handwoven table',
    price: 40,
    locationInfo: 'Melbourne',
    author: 'RogRog'
}];

// const products = (state = [], action) => {
const products = (state = fakeProductsList, action) => {
    switch (action.type) {
        case types.REMOVELISTING_SUCCESS:
            return state.filter((item) => {
                return item.id !== action.itemId;
            });
        case types.ADDLISTING_SUCCESS:
            return [
                ...state,
                action.newItem
            ];
        default:
            return state;
    }
};

// state that's specific to a component should still be stored in redux store,
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
    AddNewListingForm: {
        fields: {
            type: '',
            title: '',
            description: '',
            price: '',
            locationInfo: '',
            from: '',
            to: ''
        },
        isAttemptingToAdd: false
    }
}, action) => {
    switch (action.type) {
        case types.ADDLISTING_REQUEST:
            return {
                ...state,
                AddNewListingForm: {
                    ...state.AddNewListingForm,
                    isAttemptingToAdd: true
                }
            };
            // Refactor out duplication of two below, same ui result. 
        case types.ADDLISTING_SUCCESS:
            return {
                ...state,
                AddNewListingForm: {
                    fields: {
                        type: '',
                        title: '',
                        description: '',
                        price: '',
                        locationInfo: '',
                        from: '',
                        to: ''
                    },
                    isAttemptingToAdd: false
                }
            };
        case types.ADDLISTING_FAILURE:
            return {
                ...state,
                AddNewListingForm: {
                    fields: {
                        type: '',
                        title: '',
                        description: '',
                        price: '',
                        locationInfo: '',
                        from: '',
                        to: ''
                    },
                    isAttemptingToAdd: false
                }
            };

        case types.UI_UPDATE_FORMFIELD:
            var newFields = {...state.AddNewListingForm.fields };
            newFields[action.fieldKey] = action.fieldValue;
            return {
                ...state,
                AddNewListingForm: {
                    ...state.AddNewListingForm,
                    fields: newFields
                }
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
    products,
    auth,
    user,
    ui,
    routing,
    form: formReducer
});

export default rootReducer;
