var db = require('./index.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema ({
  'username': { type: String, index: {unique: true} },
  // 'password': String
  'team' : [] // definitely need to check if this works
});

var User = mongoose.model('User', userSchema);

User.selectAll = function(callback) {
  User.find({}, function(err, users) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
};

// userSchema.methods.comparePassword = function(storePassword, attemptedPassword,callback) {
//   bcrypt.compare(storedPassword, attemptedPassword, function(err, isMatch){
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, isMatch);
//     }
//   });
// }



module.exports = User;
