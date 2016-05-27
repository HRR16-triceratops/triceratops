// import DB
// import User model
var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var express = require('express');
var router = express.Router();


router.post('/login', function(req, res){
  var user = req.body;
  User.findOne({username: user.username}, function(err,found){
    if(found){
      if(found.comparePassword(user.password)){
        console.log("user authenticated!");
        res.end();
      }
    } else {
      res.redirect("/signup");
    }
  });
});


router.get('/logout', function(req, res){

});


router.post('/signup', function(req, res){

  var user = req.body;
  console.log(user.displayName)
  User.findOne({username: user.username})
    .exec(function(err,found){
    if(!found){
      var newUser = new User({
        username: user.username,
        password: user.password,
        displayName: user.displayName,
        email: user.email
      });
      newUser.save(function(err, newUser){
        if(err){
          res.status(500).send(err);
        } else {
          console.log("user created!");
          res.end();
        }
      });   
    } else {
      console.log("Account already exists");
      res.redirect('/login');
    }
  });
});


// export router
module.exports = router;