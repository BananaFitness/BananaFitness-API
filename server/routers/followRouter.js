var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/')
  // Sets up user id to follow followee id
  .post(function (req, res) {
    if (!validator.isUUID(req.body.userid)) {
      res.json('User id is not a valid UUID');
    } else if (!validator.isUUID(req.body.followeeid)) {
      res.json('Followee id is not a valid UUID');
    }

    // Need to do a check here to see if the id's exist
    // Maybe put the two checks into a promise array
    // Then call promise all
    // And on the end, if true, do findOrCreate

    db.Follow.findOrCreate({
      where: {
        user_id: req.body.userid,
        followee_id: req.body.followeeid
      }
    }).spread(function (follow, created) {
      if (!created) {
        console.log(follow['user_id'] + ' is already following ' + follow['followee_id']);
      } else {
        console.log(follow['user_id'] + ' is now following ' + follow['followee_id']);
      }
      res.json(follow);
    });
  });

router.route('/:userid')
  // Get all followed user objects for user by userid
  .get(function (req, res) {
    if (!validator.isUUID(req.params.userid)) {
      res.json('User id is not a valid UUID');
    }
    db.Follow.findAll({
      where: {
        user_id: req.params.userid
      }
    }).then(function (follows) {
      if (moves.length === 0) {
        res.json('There are no follows for this user');
      } else {
        var followees = [];
        for (var i = 0; i < follows.length; i++) {
          db.findOne({
            where: {
              user_id: follows[i]['followee_id']
            }
          }).then(function (followee) {
            followees.push(followee);
            if (followees.length === follows.length) {
              res.json(followees);
            }
          });
        }
      }
    });
  });
module.exports = router;








