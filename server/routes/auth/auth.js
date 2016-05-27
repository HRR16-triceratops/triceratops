var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var utils = require('../../utils/utils.js');


/**
 *  Request Handler for POST Method
 *  @expected data with Req - Login credentials (username, password)
 *  @return {Object} - contains user data object (username, displayName, email) and JWT token string
 */
router.post('/login', function(req, res){
  var user = req.body;
  User.findOne({username: user.username})
    .then(function(found){
      if(found){
        found.comparePassword(user.password)
          .then(function(result){
            if(result){
              console.log("User authenticated!");
              found = utils.getCleanUser(found);
              var token = utils.generateToken(found);
              res.json({
                user: found,
                token: token
              });
            } else {
              res.send("Username or password incorrect");
            }
          })
          .catch(function(err){
            res.status(404).send(err);
          });
      } else {
        res.send("Username or password incorrect");
      }
    })
    .catch(function(err){
      res.status(404).send(err);
    });
});

/**
 *  Request Handler for POST(create) Method
 *  @expected data with Req - Complete user data(username, password, displayName, email)
 *  @return {Object} - contains user data object (username, displayName, email) and JWT token string
 */
router.post('/signup', function(req, res){
  var user = req.body;
  User.findOne({username: user.username})
    .then(function(found){
      if(!found){
        var newUser = new User({
          username: user.username,
          password: user.password,
          displayName: user.displayName,
          email: user.email
        });
        newUser.save()
          .then(function(newUser){
            console.log("Account created!");
            var token = utils.generateToken(newUser);
            res.json({
              user: newUser,
              token: token
            });
          })
          .catch(function(err){
            res.status(500).send(err);
          });   
      } else {
        console.log("Account already exists");
        res.send("Account already exists");
      }
    })
    .catch(function(error){
      res.status(404).send(err);
    });

  });

module.exports = router;