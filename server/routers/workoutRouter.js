var router = require('express').Router();
var db = require('../models/index');

router.route('/')
  // Gets all workouts
  .get(function (req, res) {
    db.Workout.findAll().then(function (workouts) {
      res.json(workouts);
    });
  });
  // Possible search by other parameters via GET

router.route('/:userid')
  .get(function (req, res) {
    db.Workout.findAll({
      where: {
        UserId: req.params.userid
      }
    }).then(function (workouts) {
      res.json(workouts);
    });
  });

router.route('/')
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
    });
  });

module.exports = router;