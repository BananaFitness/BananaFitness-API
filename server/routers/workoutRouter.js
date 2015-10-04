var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/')
  // Creates a new workout for a user
  // When we create a workout, we'll have to make calls to create new moves
  .post(function (req, res) {
    if (!validator.isUUID(req.body.userid)) {
      res.json('User id is not a valid UUID');
    }
    db.Workout.findOrCreate({
      where: {
        user_id: req.body.userid,
        name: req.body.name
      }
    }).spread(function (workout, created) {
      if (!created) {
        console.log('Workout already exists in the database!');
      } else {
        console.log('Workout created!');
      }
      res.json(workout);
    });
  });

router.route('/:workoutid')
  // Gets a workout by workoutid
  .get(function (req, res) {
    if (!validator.isUUID(req.params.workoutid)) {
      res.json('Workout id is not a valid UUID');
    }
    db.Workout.findOne({
      where: {
        id: req.params.workoutid
      }
    }).then(function (workout) {
      if (!workout) {
        res.json('Workout id does not exist in the database');
      }
      res.json(workout);
    });
  })
  // Deletes workout by workout
  .delete(function (req, res) {
    // Be sure to delete all moves first
  });

module.exports = router;