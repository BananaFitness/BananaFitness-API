var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/')
  // Gets all workouts
  .get(function (req, res) {
    db.Workout.findAll().then(function (workouts) {
      if (workouts.length === 0) {
        res.json('There are no workouts in the database');
      }
      res.json(workouts);
    });
  });
  // Possible search by other parameters via GET

module.exports = router;