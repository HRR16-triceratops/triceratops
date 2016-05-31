var jwt = require('jsonwebtoken');

// Set JWT Secret
var secret = process.env.JWT_SECRET || 'sleepingpuppies';

/**
 *  Support function for generating JWT token
 *  @expected data with call - user object (username, displayName, email)
 *  @return {String} - token string
 */
exports.generateToken = function(user){
  var u = {
    username: user.username,
    displayName: user.displayName,
    email: user.email
  };
  return jwt.sign(u, secret, {
    expiresIn: 60 * 60 * 24
  });
};

/**
 *  Support function to prepare for JWT token generation.  Returns a modified
 *  user object without a password to keep password from being included in token.
 *  @expected data with call - user object (username, password, displayName, email)
 *  @return {object} - modified user object (username, displayName, email)
 */
exports.getCleanUser = function(user){
  user = user.toJSON();
  return {
    username: user.username,
    displayName: user.displayName,
    email: user.email
  };
};
