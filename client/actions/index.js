import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import { reset } from 'redux-form';
import helper from '../services/helper';

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
        //    id: 88291,
        //     type: 'couch',
        //     title: 'best couch',
        //     description: 'description of best couch!',
        //     price: 150,
        //     locationInfo: 'australia',
        //     author: 'RogRog'
        // };
        // // mock API delay
        // setTimeout(()=>{
        //  // inside success handler/then/callback
        //   dispatch(addListingSuccess(newItemReturnedFromServer));
        //   // mock failure 
        //    dispatch(addListingFailure()); // should only mutate state-ui
        // },3000);
        console.log('author inside addNewListing thunk is: ' + author);

        let mockNewProduct = {
            type: 'couch',
            title: 'best couch',
            description: 'description of best couch!',
            price: 150,
            locationInfo: 'australia',
            author: 'RogRog'
        };
        // make API call to server
        return helper.postHelper('/products', mockNewProduct)
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
}


//////////////////////////////////////////////////////////////
// Synchronous Action Creators
//////////////////////////////////////////////////////////////

/**
 *  @param {Object} userData - Login credentials (username, password)
 */
export const makeLoginRequest = (userData) => {
    return {
        type: types.LOGIN_REQUEST,
        payload: userData
    };
};

/**
 *  @param {Object} user - user data excluding password
 *  @param {String} token - JWT token data
 */
export const loginSuccess = (user, token) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            user: user,
            token: token
        }
    };
};

/**
 *  @param {Object} err - Response object returned from server
 */
export const loginFailure = (err) => {
    return {
        type: types.LOGIN_FAILURE,
        payload: err
    };
};

/**
 *  @param {Object} userData - Login credentials (username, email, password)
 */
export const makeSignupRequest = (userData) => {
    return {
        type: types.SIGNUP_REQUEST,
        payload: userData
    };
};

/**
 *  @param {Object} user - user data excluding password
 *  @param {String} token - JWT token data
 */
export const signupSuccess = (user, token) => {
    return {
        type: types.SIGNUP_SUCCESS,
        payload: {
            user: user,
            token: token
        }
    };
};

/**
 *  @param {Object} err - Response object returned from server
 */
export const signupFailure = (err) => {
    return {
        type: types.SIGNUP_FAILURE,
        payload: err
    };
};

export const logOut = () => {
    return {
        type: types.LOGOUT
    };
};

/**
 *  @param {String} token - JWT token data stored in localStorage
 */
export const verifyUser = (token) => {
    return {
        type: types.VERIFY_USER,
        payload: {
            token: token
        }
    };
};

/**
 *  @param {Object} user - user data excluding password
 *  @param {String} token - JWT token data
 */
export const verifySuccess = (user, token) => {
    return {
        type: types.VERIFY_SUCCESS,
        payload: {
            user: user,
            token: token
        }
    };
};

/**
 *  @param {Object} err - Response object returned from server
 */
export const verifyFailure = (err) => {
    return {
        type: types.VERIFY_FAILURE,
        payload: err
    };
};


//////////////////////////////////////////////////////////////
// Asynchronous Action Creator combination
//////////////////////////////////////////////////////////////

/**
 *  @param {Object} userData - Login credentials (username, password)
 */
export const attemptLogin = (userData) => {
    return function(dispatch) {
        dispatch(makeLoginRequest(userData));
        var url = '/auth/login';
        return helper.postHelper(url, userData)
            .then(resp => {
                let data = resp.data;
                if (resp.status != 200) {
                    dispatch(loginFailure(resp.payload));

                    // If User is Authorized from server, save JWT token to localStorage,
                    // dispatch success action and redirect to profile(dashboard) page
                } else {
                    window.localStorage.setItem('jwtToken', data.token);
                    dispatch(loginSuccess(data.user, data.token));
                    browserHistory.push('/profile');
                }
            })

        // If User is rejected from server, dispatch failure action and reset login Form
        .catch(err => {
            console.error(err);
            dispatch(loginFailure(err));
            dispatch(reset('LoginForm'));
        });
    };
};

/**
 *  @param {Object} userData - Login credentials (username, email, password)
 */
export const attemptSignup = (userData) => {
    return (dispatch) => {
        dispatch(makeSignupRequest(userData));
        var url = '/auth/signup';
        return helper.postHelper(url, userData)
            .then(resp => {
                let data = resp.data;
                if (resp.status != 200) {
                    console.log('resp status is not 200');

                    // If User is Authorized from server, save JWT token to localStorage,
                    // dispatch success action and redirect to profile(dashboard) page
                } else {
                    window.localStorage.setItem('jwtToken', data.token);
                    dispatch(signupSuccess(data.user, data.token));
                    browserHistory.push('/profile');
                }
            })

        // If User is rejected from server, dispatch failure action and reset login Form
        .catch(err => {
            console.error(err);
            dispatch(signupFailure(err));
            dispatch(reset('SignupForm'));
        });
    };
};

/**
 *  @param {String} token - JWT token data stored in localStorage
 */
export const attemptVerify = (token) => {
    return (dispatch) => {
        let url = '/auth/verify';
        dispatch(verifyUser(token));
        return helper.getHelper(url)
            .then(resp => {
                let data = resp.data;

                // If User is verified from server,
                // dispatch success action which will update state
                dispatch(verifySuccess(data.user, data.token));
            })

        // If User is rejected from server, dispatch failure action
        .catch(err => {
            dispatch(verifyFailure(err));
        });
    };
};
