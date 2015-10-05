var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');
 
router.route('/')
  // Returns a list of feed workouts
  .get(function (req, res) {
    if (!validator.isUUID(req.body.workoutid)) {
      res.json('User id is not a valid UUID');
    }
  })


router.route('/:userid')
  // Returns a list of feed workouts of followees of the userid
  .get(function (req, res) {
    if (!validator.isUUID(req.params.userid)) {
      res.json('User id is not a valid UUID');
    }
    
  });

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
      move.destroy().then(function () {
        res.json('Deleted move from the database');
      }); 
    });
  });

module.exports = router;