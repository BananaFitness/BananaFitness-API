// server.js

// BASIC SETUP
// =============================================================================

// Call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var db = require(__dirname + '/models/index');

// Sync the database models
db.sequelize.sync({
  force: true
});

// Create an express app
var app = express();

app.use(express.static(__dirname + '/client'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// Configure the app to use bodyParser()
// This will let us get the data from post
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set our port
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

// All of our routes will console log a status
app.use(function (req, res, next) {
  console.log('==========================================');
  console.log(req.method + ': ' + req.url);
  next();
});

// Ideally, this route sends the index.html
router.get('/', function (req, res) {
  // res.sendFile(__dirname + '/public/views/index.html');
  res.json({
    message: 'Node-Express-Sequelize Server!'
  });
});

// USER ROUTES -------------------------------

router.route('/users')
  // Gets all users
  .get(function (req, res) {
    db.User.findAll().then(function (users) {
      res.json(users);
    });
  });
  // Possible search by other parameters via GET

router.route('/user/:username')
  // Gets a user by username
  .get(function (req, res) {
    db.User.findAll({
      where: {
        username: req.params.username
      }
    }).then(function (user) {
      res.json(user);
    })
  });

router.route('/user')
  // Create a new user
  .post(function (req, res) {
    db.User.findOrCreate({
      where: {
        username: req.body.user,
        password: req.body.password
      }
    }).spread(function (user, created) {
      if (!created) {
        console.log('User already exists!');
        // Handle sending error about user not existing
      } else {
        console.log('User created!');
      }
      res.json(user);
    })
  })
  // Sign in a user
  .post(function (req, res) {
    db.User.findAll({
      where: {
        username: req.body.user
      }
    }).then(function (user) {
      // Check if user existed
      // Check the user's password via req.body.password
    })
  });

// WORKOUT ROUTES -------------------------------

router.route('/workouts')
  // Gets all workouts
  .get(function (req, res) {
    db.Workout.findAll().then(function (workouts) {
      res.json(workouts);
    });
  });
  // Possible search by other parameters via GET

router.route('/workouts/:username')
  .get(function (req, res) {
    db.Workout.findAll({
      where: {
        username: req.params.username
      }
    }).then(function (workouts) {
      res.json(workouts);
    })
  });

router.route('/workout')
  // Creates a new workout for a user
  // When we create a workout, we'll have to make calls to create new moves
  .post(function (req, res) {
    db.Workout.findOrCreate({
      where: {
        UserId: req.body.userid,
        name: req.body.name
      }
    }).spread(function (workout, created) {
      if (!created) {
        console.log('Workout already exists!');
        // Handle sending error about workout not existing
      } else {
        console.log('Workout created!');
      }
      res.json(workout);
    })
  });

// MOVE ROUTES -------------------------------

router.route('/moves')
  // Gets all moves
  .get(function (req, res) {
    db.Move.findAll().then(function (moves) {
      res.json(moves);
    });
  });
  // Possible search by other parameters via GET

router.route('/moves/:workoutid')
  // Gets all moves by workoutId
  .get(function (req, res) {
    db.Move.findAll({
      where: {
        WorkoutId: req.params.workoutid
      }
    }).then(function (moves) {
      res.json(moves);
    })
  });

router.route('/move')
  // Creates new moves for a workout
  .post(function (req, res) {
    db.Move.findOrCreate({
      where: {
        WorkoutId: req.body.workoutid,
        name: req.body.name,
        category: req.body.category,
        weight: req.body.weight,
        reps: req.body.reps
      }
    }).spread(function (move, created) {
      if (!created) {
        console.log('Move already exists!');
        // Handle sending error about move not existing
      } else {
        console.log('Move created!');
      }
      res.json(workout);
    })
  });

// REGISTER OUR ROUTES -------------------------------

// All of our routes will be prefixed with /api in the future when we want to build
// an api
// Right now, to retrieve products, the '/products' route handles getting products 
// and rendering the html
// Ideally, the '/products' route would make a call to the '/api/products' route
// which handles the databases interactions and retrieves data for the '/products'
// route to use to use the data to render
// app.use('/api', router);

// All of our routes will be prefixed with /
app.use('/api', router);

module.exports = app;