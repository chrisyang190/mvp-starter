var db = require('./index.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema ({
  'username': { type: String, index: {unique: true} },
  'password': String
});

userSchema.methods.comparePassword = function(storePassword, attemptedPassword,callback) {
  bcrypt.compare(storedPassword, attemptedPassword, function(err, isMatch){
    if (err) {
      callback(err);
    } else {
      callback(null, isMatch);
    }
  });
}

var User = mongoose.model('User', userSchema);

module.exports = User;
