var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/:userid')
  // Gets workout by userid
  // If user does not exist, returns error message
  .get(function (req, res) {
    if (!validator.isUUID(req.params.userid)) {
      res.json('User id is not a valid UUID');
    }
    db.User.findOne({
      where: {
        id: req.params.userid
      }
    }).then(function (user) {
      if (!user) {
        res.json('User id does not exist in the database');
      }
      db.Workout.findAll({
        where: {
          user_id: user['id']
        }
      }).then(function (workouts) {
        if (workouts.length === 0) {
          res.json('There are no workouts for this user');
        }
        res.json(workouts);
      });
    });

  });

// NEEDS TESTING
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