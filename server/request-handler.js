// var request = require('request');
var db = require('../database-mongo/index');
var mongoose = require('mongoose');
var User = require('../database-mongo/user');
var bodyParser = require('body-parser');
var Promise = require("bluebird");
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

exports.getAllUsers = function(req, res){
  console.log('get All Users REQUEST', req);
  User.selectAll(function(err, data){
    if(err) {
      console.log('entered error');
      res.sendStatus(500);
    } else {
      // console.log('entered selectAll data:', data);
      res.json(data);
    }
  });

}

exports.getOneUser = function(req, res) {
  console.log('request', req)
  User.selectOne(req.body.user, function(err, data){
    if(err){
      console.log('entered error');
      res.sendStatus(500);
    } else {
      console.log('entered selectOne data:', data);
      res.json(data);
    }
  })
}

// exports.enterUser = function (req, res) {

//   console.log('request user in EnterUSER', req.body.user);
//   var newUser = new User({
//         username: 'Test Body Parser 4',
//         team: [{name: 'espeon'}, {name: 'umbreon'}]
//       });
//   console.log('new user before save', newUser)
//       newUser.save(function(error, newUser){
//           console.log('User created');
//           // res.status(201, newUser);
//           res.status(201).send(newUser);
    
//       })
// }

exports.enterUser = function (req, res) {
  console.log('entered user function');
  console.log('request user in EnterUSER', req.body.user);
  var trainername = req.body.user;
  // console.log
  User.findOne({username: trainername})
  .exec(function(error, user){
    console.log('error out:', error);
    console.log('user queried', user);
    if(!user || error) {
      var newUser = new User({
        username: trainername,
        team: req.body.team
      });

      newUser.save(function(error, newUser){
      
          console.log('User created');
          // res.status(201, newUser);
          res.status(201).send(newUser);
    
      })
    } else {
      //portray users team?
      console.log('User Exists:', user)
      // res.send(200, newUser);
      res.status(200).send(user);
    }
  })
}