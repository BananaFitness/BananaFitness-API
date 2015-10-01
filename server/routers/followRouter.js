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

// Get all follows for user id

module.exports = router;