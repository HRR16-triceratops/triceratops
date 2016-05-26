// import DB
// import User model
var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var express = require('express');
var router = express.Router();

// create helper method
router.get('/', function(req, res){
  res.send('Hello authentication');
});

  // check user with User model
  // create user with User model
  
// '/login'
// '/logout'
// '/signup'

// export router
module.exports = router;