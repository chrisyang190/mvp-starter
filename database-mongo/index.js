
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

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
  })
}

var User = mongoose.model('User', userSchema);

//can team also be thrown in same file?
var teamSchema = mongoose.Schema({
  'teamname': String,
  'username': String, 
  'teamArray' : [Schema.Types.Mixed] // definitely need to check if this works

});

var Team = mongoose.model('Team', teamSchema);



module.exports.selectAll = selectAll;