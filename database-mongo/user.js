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
      // console.log('users in select all', users);
      callback(null, users);
    }
  });
};

User.selectOne = function(user, callback) {
    User.findOne({'username': user}, function(err, user){
      if(err) {
        callback(err, null);
      } else {
        console.log('user in selectOne query', user);
        callback(null, user);
      }
    })

}

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
