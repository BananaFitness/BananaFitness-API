var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/')
  // Gets all moves
  .get(function (req, res) {
    db.Move.findAll().then(function (moves) {
      if (moves.length === 0) {
        res.json('There are no moves in the database');
      }
      res.json(moves);
    });
  });
  // Possible search by other parameters via GET

router.route('/:workoutid')
  // Gets moves by workoutid
  // If workout does not exist, returns error message
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
      db.Move.findAll({
        where: {
          workout_id: workout['id']
        }
      }).then(function (moves) {
        if (moves.length === 0) {
          res.json('There are no moves for this workout');
        }
        res.json(moves);
      });
    });
  });

  
// NEEDS TESTING
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