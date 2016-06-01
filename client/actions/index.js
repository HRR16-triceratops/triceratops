import * as types from '../constants/ActionTypes';
import util from '../services/helper';

// Refactor - all user actions should, as an intermediate step, 
// fetch new user data from server and hydrate local state! 
// make it its own action, and handled by a reducer.. ? 
/*
	if can't figure a way to do it wihitn combineReducers, or wrapping it inside a HOR,
	then every single reducer inside of combinedReducer will also deal with a
	STATE_HYDRATE action that sets { ...action.payload.ui } or { ... }
*/

const addListingRequest = () => {
    console.log('inside action creator - addListingRequest');
    return {
        type: types.ADDLISTING_REQUEST
    };
};

const addListingSuccess = (newItem) => {
	// remmeber in UI state, to clear all fields once successful! 
	return {
		type: types.ADDLISTING_SUCCESS,
		newItem: newItem
	}; 
};

const addListingFailure = () => {
	return {
		type: types.ADDLISTING_FAILURE
	}; 
};

export const addNewListing = () => {
    // remember author (no id required, assigned by Mongo); 
    return (dispatch, getState) => {
        dispatch(addListingRequest());
        // assume that author in newProduct points to a user.id, rather than user name string.
        // has to be logged in to even be able to get this far, so assume id can be got. 
        let author = getState().user.id;
        // grab current ui-form-data state and author state (above)
        // let newProductData = {
        //     ...getState().ui.AddNewListingForm.fields,
        //     author: author
        // };
        // //assume succesful
        // let newItemReturnedFromServer = {
        // 		id: 88291,
        //     type: 'couch',
        //     title: 'best couch',
        //     description: 'description of best couch!',
        //     price: 150,
        //     locationInfo: 'australia',
        //     author: 'RogRog'
        // };
        // // mock API delay
        // setTimeout(()=>{
        // 	// inside success handler/then/callback
        // 	 dispatch(addListingSuccess(newItemReturnedFromServer));
        // 	 // mock failure 
        // 	  dispatch(addListingFailure()); // should only mutate state-ui
        // },3000);
        console.log('author inside addNewListing thunk is: '+ author); 
        
		  let mockNewProduct = {
		            type: 'couch',
		            title: 'best couch',
		            description: 'description of best couch!',
		            price: 150,
		            locationInfo: 'australia',
		            author: 'RogRog'
		        };
        // make API call to server
        return util.postHelper('/products', mockNewProduct)
            .then((response) => {
                console.log('===================================');
                console.log('response received from server!');
                console.log(response);
                console.log('===================================');
                dispatch(addListingSuccess(newItem)); 
            })
            .catch((err) => {
                console.log("trying to add product, but failed! catch handler in promise!");
            });
    };
};

export const updateFormField = (fieldKey, fieldValue) => {
    return {
        type: types.UI_UPDATE_FORMFIELD,
        fieldKey: fieldKey,
        fieldValue: fieldValue
    }
}

// action creators
const loginRequest = () => {
    return {
        type: types.LOGIN_REQUEST
    };
};

const loginFailure = () => {
    return {
        type: types.LOGIN_FAILURE
    };
}

const loginSuccess = (payloadObj) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            ...payloadObj
        }
    }
};

export const toggleViewManageListings = () => {
    // console.log('=== ACTION CREATOR: toggleViewManageListings invoked! ==='); 
    return {
        type: types.UI_TOGGLE_VIEW_MANAGEDLISTING
    };
}

export const toggleViewAddNewListingForm = () => {
    return {
        type: types.UI_TOGGLE_VIEW_ADDNEWLISTINGFORM
    };
}

const removeListingRequest = (itemId) => {
    return {
        type: types.REMOVELISTING_REQUEST,
        itemId: itemId
    }
};

const removeListingSuccess = (itemId) => {
    return {
        type: types.REMOVELISTING_SUCCESS,
        itemId: itemId
    }
};

const removeListingFailure = (itemId) => {
    return {
        type: types.REMOVELISTING_FAILURE,
        itemId: itemId
    };
};

// thunks
export const removeRentedItem = (itemId) => {
    return (dispatch) => {
        // notify state that listing removal is pending
        dispatch(removeListingRequest(itemId));
        // api put call to remove item. Mock it for now.
        setTimeout(() => {
            // mock success response, which confirms that server-state/db updated with removal.
            // now simply update local state (no need to call down whole data, but probably best
            // when considering multiple users, good time to rehydrate local state tree)
            dispatch(removeListingSuccess(itemId));
        }, 3000);
        // failure mimics removeListingSuccess in UI reducer (to stop spinner), but does not get 
        // handled at all by products reducer (because actual products state should not change on
        //  failure);
    };
};
