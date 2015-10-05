var router = require('express').Router();
var authenticator = require('../authenticator');
var db = require('../models/index');

//Local Signin route
router.route('/signin')
  .post( authenticator.authenticate('local', 
    { failureRedirect: '/signin' }),
    function(req,res) {
      req.session.user = req.user;
      res.redirect('/');
  });

//Local Signup Route
router.route('/signup')
  .post(function (req, res) {
    db.User.findOrCreate({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).spread(function (user, created) {
      if (!created) {
        console.log('User already exists!');
        // Handle sending error about user not existing
      } else {
        console.log('User created');
      }
      res.json(user);
    });
  });

router.route('/signout')
  .get(function (req, res) {
    req.logout();
    res.send("logged out", 401);
  });

module.exports = router;
