var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

// Gets user by userid
router.route('/:userid')
  // Gets a user by userid
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
      res.json(user);
    });
  });

// Gets user by username
router.route('/username/:username')
  // Gets a user by username
  .get(function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function (user) {
      if (!user) {
        res.json('Username does not exist in the database');
      }
      res.json(user);
    });
  });

router.route('/')
  // Create a new user
  .post(function (req, res) {
    db.User.findOrCreate({
      where: {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        age: req.body.age,
        location: req.body.location
      }
    }).spread(function (user, created) {
      if (!created) {
        console.log('User already exists in the database!');
        // Handle sending error about user not existing
      } else {
        console.log('User created!');
      }
      res.json(user);
    });
  });

module.exports = router;