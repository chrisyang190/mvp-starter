var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');
var db = require('../database-mongo/index'); // has schemas.
var User = require('../database-mongo/user')
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var handler = require('./request-handler');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));


// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.post('/users' , handler.enterUser);
// app.get('/users', function(req, res){
//   res.json({user: 'test'});
// });
app.get('/users', handler.getAllUsers);

// app.post('/', function(req,res){
//   console.log('Handling post');
//  res.sendStatus(201);

// })


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

