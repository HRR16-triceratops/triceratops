import axios from 'axios';

var localStorageToken = local.storage.getItem('token') ? local.storage.getItem('token') : 'default';

var postHelper = function(url, data){
  //check to see if this token data is accessible this way and what it returns
  axios.post(url, {
    headers: {
      Authorization: "Bearer " + localStorageToken
    },
    body: data
  })
  .then(function(res){
    return res;
  });
};

var getHelper = function(url, user){
    axios.post(url, {
    headers: {
      Authorization: "Bearer " + localStorageToken
    }
  })
  .then(function(res){
    return res;
  });
};


var putHelper = function(url, id, user){
  axios.put(url, {
    params: {
      ID: id
    },
    data: user
  });
  axios.post(url, {
    headers: {
      Authorization: "Bearer " + localStorageToken
    },
    body: data
  })
  .then(function(res){
    return res;
  }); 

};