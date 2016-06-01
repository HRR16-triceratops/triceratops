import * as types from '../constants/ActionTypes';
import util from '../services/helper'; 

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
	console.log('===== inside action creator: removeListingRequest');
	return {
		type: types.REMOVELISTING_REQUEST, 
		itemId: itemId
	}
};

const removeListingSuccess = () => {
	console.log('does nothing!');
};

const removeListingFailure = () => {
	console.log('does nothing!');
}; 


/**
 *  Put helper function for making api calls to server to update data in db
 *  @expected arguments - Url, data (i.e. object of user data or product data)
 *  @return {Object}
 */
// util.putHelper = function(url, data) {
//     return axios.put(url, {
//             headers: {
//                 Authorization: "Bearer " + localStorageToken
//             },
//             params: {
//                 ID: data.id
//             },
//             data: data
//         })
//         .then(function(res) {
//             return res;
//         });
// };

// thunk
export const removeRentedItem = (itemId) => {
	console.log('===== inside thunk removeRentedItem'); 

	return (dispatch) => {
		// notify state that listing removal is pending
		dispatch(removeListingRequest(itemId));
		// api put call to remove item

							// util.putHelper('http://www.google.com.au', {data: 99999})
							// 	.then((res)=>{
							// 		console.log("doing something inside util.puthelper!")
							// 	})
			// success - update state with success action and payload (new state)
									// optimistic render (modify state client-side); 
			// failure - update state with failure action (no payload)
	};	

	// return {
	// 	type: types.REMOVE_RENTED_ITEM,
	// 	itemId: itemId
	// };
};

// export function testFunction(){
// 	console.log("see if this test function exports properly for use!");
// 	return("some value from testFunction"); 
// }; 

// // thunks
// export const attemptLogin = (username,password) => {
// 	console.log('================ attemptLogin thunk invoked! =================');
// 	return (dispatch, getState) => {
// 		dispatch(loginRequest());
// 		// make API call here with help of helpers.
// 				util.postLoginRequestToServer(username, password, (err, response)=>{
// 					if (err) {
// 						dispatch(loginFailure()); 
// 					}
// 					if (response){
// 						// window.localStorage.setItem('token', response.token)
// 						// parse response? for token and user info. 
// 						console.log('====================================');
// 						console.log('the response came back as follows:');
// 						console.log(JSON.stringify(response,null,2)); 
// 						console.log('====================================');
// 						// dispatch(loginSuccess(payloadObj));
// 					}

// 				});
// 				// if successful, dispatch LOGIN SUCCESS
// 				// else dispatch LOGIN FAILURE
// 	};
// }; 
