// import DB
// import User model
var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.send('Hello profiles');
});
// create helper method
  // get listing belong to user
  // get username for user
  // delete listing
  // post new listing
  
// '/' GET, POST, DELETE, (PUT)

// export router
module.exports = router;