
var db = require('../database-mongo/index');
var mongoose = require('mongoose');
var User = require('../database-mongo/user');
var bodyParser = require('body-parser');
var Promise = require("bluebird");

exports.getAllUsers = function(req, res){
  User.selectAll(function(err, data){
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });

}

exports.getOneUser = function(req, res) {
  User.selectOne(req.body.user, function(err, data){
    if(err){
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
}

exports.enterUser = function (req, res) {
  var trainername = req.body.user;
  User.findOne({username: trainername})
  .exec(function(error, user){
    if(!user || error) {
      var newUser = new User({
        username: trainername,
        team: req.body.team
      });

      newUser.save(function(error, newUser){
          res.status(201).send(newUser);
      })

    } else {
      res.status(200).send(user);
    }
  })
}

exports.saveUser = function(req, res){
  var trainername = req.body.user;
  User.findOne({username: trainername})
  .exec(function(error,user){
    if (!user){
      var newUser = new User ({
        username: trainername,
        team: req.body.team
      });

      newUser.save(function(error, newUser){
        res.status(201).send(newUser);
      })
    } else {
      user.team = req.body.team;
      user.save(function(error, user){
        res.status(201).send(user);
      })
    }
  })
}