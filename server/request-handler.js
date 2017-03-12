// var request = require('request');

var db = require('../database-mongo/index');
var User = require('../database-mongo/user');
// var Team = require('../database-mongo/team');


exports.enterUser = function (req, res) {
  console.log('entered user function');
  var username = req.body.username;
  // console.log
  User.findOne({username: username})
  .exec(function(error, user){
    if(!user) {
      var newUser = new User({
        username: username,
        team: []
      });

      newUser.save(function(error, newUser){
        if (error) {
          console.log('Did not successfully add user');
        } else {
          console.log('User created')
          res.send(200, newUser);
        }
      })
    } else {
      //portray users team?
    }
  })
}