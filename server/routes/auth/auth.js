// import DB
// import User model
var db = require("../../db/db.js");
var User = require("../../db/user/user.js");
var express = require('express');
var router = express.Router();

// var generateToken(user)

router.get('/login', function(req, res){
  User.find({}, function(err,body){
    res.send(body);
  });
});

  // User.find({email: req.body.email})
  // })
  // .then(comparePassword(savedPassword, req.body.password))
  // .then(function(){
  //   res.redirect('/products');
  // })
  // .catch(function(){
  //   res.redirect('/login');


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