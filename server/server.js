var express = require('express');
var bodyParser = require('body-parser');
var db = require(__dirname + '/models/index');

// If true, whole database is dropped on start
var refreshData = true;
// Sync the database models
db.sequelize.sync({
  force: refreshData
}).then(function () {
  if (refreshData) {
    // Write all company data
    var data = require('../data.json');

    var userData = data['users'];
    console.log(userData);
    for (var i = 0; i < userData.length; i++) {
      db.User.findOrCreate({
        where: {
          username: userData[i]['username'].toString(),
          password: userData[i]['password'].toString(),
        }
      }).spread(function (user, created) {
        if (!created) {
          console.log('User ' + user['name'] + ' not created!');
        } else {
          console.log('User ' + user['name'] + ' created!');
        }
      });
    }

    var workoutData = data['workouts'];
    console.log(workoutData);
    for (var i = 0; i < workoutData.length; i++) {
      db.Workout.findOrCreate({
        where: {
          name: workoutData[i]['name'].toString(),
        }
      }).spread(function (workout, created) {
        if (!created) {
          console.log('Workout ' + workout['name'] + ' not created!');
        } else {
          console.log('Workout ' + workout['name'] + ' created!');
        }
      });
    }
  }
});

// Create an express app
var app = express();

app.use(express.static(__dirname + '/client'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// Configure the app to use bodyParser()
// This will let us get the data from post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Cookie parser
app.use(require('cookie-parser')());
//Session secret
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//Passport authenticator
var authenticator = require('./authenticator');

//Initialize passport
app.use(authenticator.initialize());
app.use(authenticator.session());

// Set our port
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var userRouter = require('./routers/userRouter');
var workoutRouter = require('./routers/workoutRouter');
var moveRouter = require('./routers/moveRouter');
var authRouter = require('./routers/authRouter');


// All of our routes will console log a status
app.use(function (req, res, next) {
  console.log('==========================================');
  console.log(req.method + ': ' + req.url);
  next();
});

// Ideally, this route sends the index.html
app.get('/', function (req, res) {
  // res.sendFile(__dirname + '/public/views/index.html');
  res.json({
    message: 'Node-Express-Sequelize Server!'
  });
});

//Routes for Authentication
app.use('/auth', authRouter);
//Routes for API/Users
app.use('/api/users', userRouter);
//Routes for API/Workouts
app.use('/api/workouts', workoutRouter);
//Ruotes for API/Moves
app.use('/api/moves', moveRouter);

module.exports = app;