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

module.exports = router;