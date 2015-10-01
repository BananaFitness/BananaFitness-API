var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/')
  // Gets all users
  .get(function (req, res) {
    db.User.findAll().then(function (users) {
      if (users.length === 0) {
        res.json('There are no users in the database');
      }
      res.json(users);
    });
  });
  // Possible search by other parameters via GET

// Gets user by username
router.route('/:username')
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
  
// NEEDS TESTING
router.route('/')
  // Create a new user
  .post(function (req, res) {
    db.User.findOrCreate({
      where: {
        username: req.body.user,
        password: req.body.password
      }
    }).spread(function (user, created) {
      if (!created) {
        console.log('User already exists!');
        // Handle sending error about user not existing
      } else {
        console.log('User created!');
      }
      res.json(user);
    });
  });

module.exports = router;