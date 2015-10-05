var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');
 
router.route('/')
  // Returns a list of feed workouts with latest first
  .get(function (req, res) {
    db.Workout.findAll({
      order: '"updatedAt" DESC'
    }).then(function (workouts) {
      if (workouts.length === 0) {
        res.json('There are no workouts in the database');
      }
      res.json(workouts);
    });
  });

router.route('/:userid')
  // Returns a list of feed workouts of followees of the userid
  .get(function (req, res) {
    var user_id = (req.params.userid === 'me') ? req.user.id : req.params.userid;
    if (!validator.isUUID(req.params.userid)) {
      res.json('User id is not a valid UUID');
    }
  });

module.exports = router;