// import DB
// import Product model
// import User model
var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var Product = require("../../db/product/product.js");
var express = require('express');
var router = express.Router();

// create helper method
router.get('/', function(req, res){
  res.send('Hello products');
});
// create helper method
  // get all listing
  // delete(deactivate) listing - should be synced with User model
  // post new listing - should be synced with User model
  
// '/' GET
// '/' POST
// '/:id' PUT

// export router
module.exports = router;