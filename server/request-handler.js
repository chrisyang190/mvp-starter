// var request = require('request');
var mongoose = require('mongoose');
var db = require('../database-mongo/index');
var User = require('../database-mongo/user');
// var Team = require('../database-mongo/team');


// exports.enterUser = function (req, res) {
//   console.log('entered user function');
//   var username = req.user;
//   // console.log
//   User.findOne({username: username})
//   .exec(function(error, user){
//     if(!user) {
//       var newUser = new User({
//         username: username,
//         team: []
//       });

//       newUser.save(function(error, newUser){
//         if (error) {
//           console.log('Did not successfully add user');
//         } else {
//           console.log('User created');
//           res.send(201, newUser);
//         }
//       })
//     } else {
//       //portray users team?
//     }
//   })
// }

exports.enterUser = function (req, res) {
  console.log('entered user function');
  var username = req.user;
  // console.log
  User.findOne({username: username})
  .exec(function(error, user){
    console.log('error here if any', error);
    console.log('user queried', user);
    if(!user || error) {
      var newUser = new User({
        username: username,
        team: []
      });

      newUser.save(function(error, newUser){
      
          console.log('User created');
          // res.status(201, newUser);
          res.status(201).send(newUser);
    
      })
    } else {
      //portray users team?
      console.log('User Exists')
      // res.send(200, newUser);
      res.status(200).send(newUser);
    }
  })
}