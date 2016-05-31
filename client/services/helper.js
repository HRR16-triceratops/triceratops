import axios from 'axios';

/**
 *  Access JWT token from user's browser. If user has no token,
 *  set equal to 'default' which the server will register as invalid
 *  and redirect to login.
 */
var localStorageToken = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : 'default';


/**
 *  Post helper function for making api calls to server
 *  @expected arguments - Url, data (i.e. object of user data or product data)
 *  @return {Object}
 */
var postHelper = function(url, data){

  return axios.post(url, {
    headers: {
      Authorization: 'Bearer ' + localStorageToken
    },
    body: data
  })
  .then(function(res){
    return res;
  });
};

/**
 *  Get helper function for making api calls to server
 *  @expected arguments - Url
 *  @return {Object}
 */
var getHelper = function(url){
  return axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + localStorageToken
    }
  })
  .then(function(res){
    return res;
  });
};

/**
 *  Put helper function for making api calls to server to update data in db
 *  @expected arguments - Url, data (i.e. object of user data or product data)
 *  @return {Object}
 */
var putHelper = function(url, data){
  return axios.put(url, {
    headers: {
      Authorization: 'Bearer ' + localStorageToken
    },
    params: {
      ID: data.id
    },
    data: data
  })
  .then(function(res){
    return res;
  });
};

module.exports = {
  postHelper: postHelper,
  getHelper: getHelper,
  putHelper: putHelper
};
