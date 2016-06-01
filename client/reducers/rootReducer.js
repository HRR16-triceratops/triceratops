import * as types from '../constants/ActionTypes';
// import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

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
        case types.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null
            };
        default:
            return state;
    };
};

// user reducer
// remember to remove fake username for lols
const user = (state = {
    username: 'RogRog',
    displayName: null,
    email: null,
    rentedItem: []
}, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                displayName: action.payload.displayName,
                email: action.payload.email
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
    };
};

// server-side schema
// query - is author id based or username based? 
// var newProduct = new Product({
//     type: prod.type,
//     title: prod.title,
//     description: prod.description,
//     price: prod.price,
//     locationInfo: prod.locationInfo,
//     author: prod.author,
//     isActivated: true
//   });

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
        // add case types and deal with payloads

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
    }
}, action) => {
    switch (action.type) {
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

        case types.UI_TOGGLE_VIEW_MANAGEDLISTING:
            // console.log('=== REDUCER-UI: UI_TOGGLE_VIEW_MANAGEDLISTING being handled! ==='); 
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

// need to add routing to handle route states syncing w/browser history .. 
const rootReducer = combineReducers({
    products,
    auth,
    user,
    ui,
    routing
});

export default rootReducer;
