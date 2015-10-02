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

module.exports = router;








