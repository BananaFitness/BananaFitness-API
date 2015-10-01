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
    db.User.findOne({
      where: {
        id: req.body.userid
      }
    }).then(function (user) {
      if (!user) {
        res.json('User id does not exist in the database');
      } else {
        db.User.findOne({
          where: {
            id: req.body.followeeid
          }
        }).then(function (followee) {
          if (!followee) {
            res.json('Followee id does not exist in the database');
          } else {
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
          }
        });
      }
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
      if (follows.length === 0) {
        res.json('There are no follows for this user');
      } else {
        var followees = [];
        for (var i = 0; i < follows.length; i++) {
          db.User.findOne({
            where: {
              id: follows[i]['followee_id']
            }
          }).then(function (followee) {
            if (!followee) {
              res.json('Followee id does not exist in the database');
            }
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








