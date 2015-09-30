var router = require('express').Router();
var db = require('../models/index');

router.route('/')
  // Gets all users
  .get(function (req, res) {
    db.User.findAll().then(function (users) {
      res.json(users);
    });
  });
  // Possible search by other parameters via GET

router.route('/:username')
  // Gets a user by username
  .get(function (req, res) {
    db.User.findAll({
      where: {
        username: req.params.username
      }
    }).then(function (user) {
      res.json(user);
    });
  });

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