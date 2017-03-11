var db = require('./index.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var teamSchema = mongoose.Schema({
  'teamname': String,
  'username': String, 
  'teamArray' : [] // definitely need to check if this works

});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;