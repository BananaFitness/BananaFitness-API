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
  // Deletes workout by workout
  .delete(function (req, res) {
    // Be sure to delete all moves first
  });

module.exports = router;