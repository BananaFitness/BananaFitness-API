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
  })

router.route('/:moveid')
  // Gets a move by moveid
  .get(function (req, res) {
    if (!validator.isUUID(req.params.moveid)) {
      res.json('Move id is not a valid UUID');
    }
    db.Move.findOne({
      where: {
        id: req.params.moveid
      }
    }).then(function (move) {
      if (!move) {
        res.json('Move id does not exist in the database');
      }
      res.json(move);
    });
  })
  // Deletes move by moveid
  .delete(function (req, res) {
    if (!validator.isUUID(req.body.moveid)) {
      res.json('User id is not a valid UUID');
    }
    db.Move.findOne({
      where: {
        id: req.body.moveid
      }
    }).then(function (move) {
      if (!move) {
        res.json('Move id does not exist in the database');
      }
      move.destroy().then(function () {
        console.log(args);
      }); 
    });
  });

module.exports = router;