var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var utils = require('../../utils/utils.js');


//Route handling for user login.
router.post('/login', function(req, res){
  var user = req.body;
  User.findOne({username: user.username}, function(err,found){
    if(err){
      res.status(404).send(err);
    }
    if(found){
      if(found.comparePassword(user.password)){
        console.log("User authenticated!");
        found = utils.getCleanUser(found);
        var token = utils.generateToken(found);
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

//Route handling for user signup.
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
          console.log("Account created!");
          var token = utils.generateToken(newUser);
          res.json({
            user: newUser,
            token: token
          });
        }
      });   
    } else {
      console.log("Account already exists");
      res.send("Account already exists");
    }
  });
});

module.exports = router;