var router = require('express').Router();
var db = require('../models/index');

router.route('/')
  // Gets all moves
  .get(function (req, res) {
    db.Move.findAll().then(function (moves) {
      res.json(moves);
    });
  });
  // Possible search by other parameters via GET

router.route('/:workoutid')
  // Gets all moves by workoutId
  .get(function (req, res) {
    db.Move.findAll({
      where: {
        WorkoutId: req.params.workoutid
      }
    }).then(function (moves) {
      res.json(moves);
    });
  });

router.route('/')
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
    });
  });

module.exports = router;