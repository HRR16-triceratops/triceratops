var User = require('../../db/user/user.js');
var express = require('express');
var expressJwt = require('express-jwt');
var router = express.Router();
var secret = process.env.JWT_SECRET || 'sleepingpuppies';

/**
 *  Request Handler for GET(read) Method
 *  @expected data with Req - nothing
 *  @expected Header with Req - { "Authorization": "Bearer <JWT_TOKEN>"}
 *  @return {Array} - Array of every product Object
 */

 // Does this API needed????
router.get('/:username', expressJwt({secret: secret}), function(req, res){
  var username = req.params.username;
  User.findOne({username: username}).then(function (user) {
    delete user._id;
    delete user.password;
    delete user.__v;
    res.send(user);
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  });
});

/**
 *  Request Handler for PUT(update) Method
 *  @expected data with Req - 1. ObjectId as parameter(req.params.id)
 *                            2. Complete user data including the field need to be updated(req.body)
 *  @expected Header with Req - { "Authorization": "Bearer <JWT_TOKEN>"}
 */
router.put('/:id', expressJwt({secret: secret}), function(req, res){
  var id = req.params.id;
  var user = req.body;
  User.findByIdAndUpdate(id, user).then(function () {
    res.end();
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  });
});

router.put('/rent/:id', expressJwt({secret: secret}), function(req, res){
  var id = req.params.id;
  var user = req.body;
  User.findByIdAndUpdate(id, user).then(function () {
    res.end();
  }).catch(function (err) {
    console.log(err);
    res.status(404).send('weird....');
  });
});

module.exports = router;
