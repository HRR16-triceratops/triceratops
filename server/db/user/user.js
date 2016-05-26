var mongoose = require('../db.js');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');

var Schema = mongoose.Schema;
var saltRounds = 10;

//create schema for user
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cardInfo: Object
});

UserSchema.methods = {

  /**
   * comparePassword(attemptedPassword) =>
   *  @param {string} attemptedPassword - password(plain text) to be compared
   *  @return {Promise} - resolves with the boolean value represents password Matching
   */
  comparePassword: function comparePassword (attemptedPassword) {
    var password = this.password;
    var compareAsync = Promise.promisify(bcrypt.compare);
    return compareAsync(attemptedPassword, password);
  }
};

// With Pre hook, hashPassword function will be called before saving onto DB
UserSchema.pre('save', function hashPassword (next) {
  var user = this;
  
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }
  
  // hash the password
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(user.password, saltRounds).then(function(hash) {

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    }).catch(function(err) {
      console.log(err);
      next(err);
    });
});

module.exports = mongoose.model('users', UserSchema);