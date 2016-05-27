// import DB
// import User model
var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

//Token Generator Function
var generateToken = function(user){
  var u = {
    username: user.username,
    displayName: user.displayName,
    email: user.email
  };
  //need to add back in the env variable process.env.JWT_SECRET
  return token = jwt.sign(u, "sleepingpuppies", {
    expiresIn: 60 * 60 * 24
  });
};

var getCleanUser = function(user){
  var user = user.toJSON();
  return {
    username: user.username,
    displayName: user.displayName,
    email: user.email
  };
};

//Route handling for user login.
router.post('/login', function(req, res){
  var user = req.body;
  User.findOne({username: user.username}, function(err,found){
    if(err){
      res.status(404).send(err);
    }
    if(found){
      if(found.comparePassword(user.password)){
        console.log("user authenticated!");
        found = getCleanUser(found);
        var token = generateToken(found);
        res.json({
          user: found,
          token: token
        });
      }
    } else {
      res.send("Username or password incorrect");
    }
  });
});


router.get('/logout', function(req, res){

});


router.post('/signup', function(req, res){

  var user = req.body;
  User.findOne({username: user.username}, function(err,found){
    if(err){
      res.status(404).send(err);
    }
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
          var token = generateToken(newUser);
          res.json({
            user: newUser,
            token: token
          });
        }
      });   
    } else {
      console.log("Account already exists");
      res.send("User already exists");
    }
  });
});


// export router
module.exports = router;