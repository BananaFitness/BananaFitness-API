var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');
 
router.route('/')
  // Creates new moves for a workout
  .post(function (req, res) {
    if (!validator.isUUID(req.body.workoutid)) {
      res.json('User id is not a valid UUID');
    }
    db.Move.findOrCreate({
      where: {
        workout_id: req.body.workoutid,
        name: req.body.name,
        category: req.body.category,
        weight: req.body.weight,
        reps: req.body.reps
      }
    }).spread(function (move, created) {
      if (!created) {
        console.log('Move already exists in the database!');
        // Handle sending error about move not existing
      } else {
        console.log('Move created!');
      }
      res.json(move);
    });
  });

module.exports = router;