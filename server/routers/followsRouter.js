var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/:userid')
  // Get all followed user objects for user by userid
  .get(function (req, res) {
    var user_id = (req.params.userid === 'me') ? req.user.id : req.params.userid;
    if (!validator.isUUID(user_id)) {
      res.json('User id is not a valid UUID');
    }
    else
    {
      db.Follow.findAll({
        where: {
          user_id: user_id
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
    }
  });

module.exports = router;








