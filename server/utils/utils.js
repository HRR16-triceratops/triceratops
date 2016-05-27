var jwt = require('jsonwebtoken');

exports.generateToken = function(user){
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

exports.getCleanUser = function(user){
  var user = user.toJSON();
  return {
    username: user.username,
    displayName: user.displayName,
    email: user.email
  };
};