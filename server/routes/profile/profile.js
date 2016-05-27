var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var express = require('express');
var router = express.Router();

/**
 *  Request Handler for GET(read) Method
 *  @expected data with Req - nothing
 *  @return {Array} - Array of every product Object
 */
router.get('/', function(req, res){
  // Need to decide how to get JWT from client Request
  // Header, Url, POST data
  // assuming we get username somehow
  var username = 'SOMEHOW';
  
  User.findOne({username: username}).then(function (user) {
    res.send(doc);
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  })
});

router.post('/', function(req, res){
  // Once we decide how to transfer token data,
  // We will choose POST or GET handler
});

/**
 *  Request Handler for PUT(update) Method
 *  @expected data with Req - 1. ObjectId as parameter(req.params.id)
 *                            2. Complete user data including the field need to be updated(req.body)
 */
router.put('/:id', function(req, res){
  var id = req.params.id;
  var user = req.body;
  User.findByIdAndUpdate(id, user).then(function (doc) {
    res.end();
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  });
});

module.exports = router;