var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo/index'); 
var User = require('../database-mongo/user')
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var handler = require('./request-handler');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/users' , handler.enterUser);
app.post('/users/save' , handler.saveUser);
app.get('/users/pokemon', handler.getOneUser);
app.get('/users', handler.getAllUsers);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

