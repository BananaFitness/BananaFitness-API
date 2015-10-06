var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require(__dirname + '/models/index');

// If true, whole database is dropped on start
var refreshData = true;
// Sync the database models
db.sequelize.sync({
  force: refreshData
}).then(function () {
  if (refreshData) {
    // Writing test data
    var data = require('../data.json');

    var userData = data['users'];
    userData.forEach(function (userObj) {
      db.User.findOrCreate({
        where: {
          username: userObj['username'].toString(),
          password: userObj['password'].toString(),
          name: userObj['name'].toString(),
          age: userObj['age'],
          location: userObj['location'].toString(),
        }
      }).spread(function (user, created) {
        if (!created) {
          console.log('User ' + user['username'] + ' not created!');
        } else {
          console.log('User ' + user['username'] + ' created!');
          setTimeout(function () {
            var workouts = userObj['workouts'];
            workouts.forEach(function (workoutObj) {
              db.Workout.findOrCreate({
                where: {
                  user_id: user['id'],
                  name: workoutObj['name'].toString()
                }
              }).spread(function (workout, created) {
                if (!created) {
                  console.log('Workout ' + workout['name'] + ' not created!');
                } else {
                  console.log('Workout ' + workout['name'] + ' created!');
                  setTimeout(function () {
                    var moves = workoutObj['moves'];
                    moves.forEach(function (moveObject) {
                      db.Move.findOrCreate({
                        where: {
                          workout_id: workout['id'],
                          name: moveObject['name'].toString(),
                          category: moveObject['category'].toString(),
                          weight: moveObject['weight'],
                          reps: moveObject['reps'],
                          sets: moveObject['sets']
                        }
                      }).spread(function (move, created) {
                        if (!created) {
                          console.log('Move ' + move['name'] + ' not created!');
                        } else {
                          console.log('Move ' + move['name'] + ' created!');
                        }
                      });
                    });
                  }, 100);
                }
              });
            });
          }, 100);
        }
      });
    });
  }
});

// Create an express app
var app = express();

app.use(express.static(__dirname + '/client'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.status(200);
    res.end();
  }
  next();
});
//Cookie parser
app.use(cookieParser('keyboard cat'));
// Configure the app to use bodyParser()
// This will let us get the data from post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Session secret
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false}));

//Passport authenticator
var authenticator = require('./authenticator');

//Initialize passport
app.use(authenticator.initialize());
app.use(authenticator.session());

// Set our port
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var authRouter = require('./routers/authRouter');
var feedRouter = require('./routers/feedRouter');
var userRouter = require('./routers/userRouter');
var workoutRouter = require('./routers/workoutRouter');
var moveRouter = require('./routers/moveRouter');
var followRouter = require('./routers/followRouter');
var usersRouter = require('./routers/usersRouter');
var workoutsRouter = require('./routers/workoutsRouter');
var movesRouter = require('./routers/movesRouter');
var followsRouter = require('./routers/followsRouter');

// All of our routes will console log a status
app.use(function (req, res, next) {
  console.log('==========================================');
  console.log(req.method + ': ' + req.url);
  console.log(req.session);
  next();
});

// Ideally, this route sends the index.html
app.get('/', function (req, res) {
  // res.sendFile(__dirname + '/public/views/index.html');
  res.json({
    message: 'Welcome to the Covalent Fitness API!'
  });
});

var checkUser = function(req, res, next){
  if (req.isAuthenticated()) {
    next();   
  } else {
    res.status(404).end();
  }
};

// Routes for Authentication
app.use('/auth', authRouter);
// Routes for Feed
app.use('/api/feed', feedRouter);
// Routes for API/User
app.use('/api/user', checkUser, userRouter);
// Routes for API/Workout
app.use('/api/workout', checkUser, workoutRouter);
// Routes for API/Move
app.use('/api/move', checkUser, moveRouter);
// Routes for API/Follow
app.use('/api/follow', checkUser, followRouter);
// Routes for API/User
app.use('/api/users', checkUser, usersRouter);
// Routes for API/Workouts
app.use('/api/workouts', checkUser, workoutsRouter);
// Routes for API/Moves
app.use('/api/moves', checkUser, movesRouter);
// Routes for API/Follows
app.use('/api/follows', checkUser, followsRouter);

module.exports = app;