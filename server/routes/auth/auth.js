// import DB
// import User model
var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res){
  // User.find({email: req.body.email})
  // })
  // .then(comparePassword(savedPassword, req.body.password))
  // .then(function(){
  //   res.redirect('/products');
  // })
  // .catch(function(){
  //   res.redirect('/login');
});

router.get('/logout', function(req, res){
  //
});


router.get('/signup', function(req, res){
  // var password = hashPassword(req.body.password);
  // var newUser = new User({
  //   email: req.body.email,
  //   password: password
  // });
  // newUser.save()
  //   .then(function(){
  //   res.end();
  //   })
  //   .catch(function(err){
  //     console.log(err);
  //   });
});


// export router
module.exports = router;