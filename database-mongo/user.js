var db = require('./index.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema ({
  'username': { type: String, index: {unique: true} },
  'team' : []
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


module.exports = User;
