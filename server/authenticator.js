var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./models/index');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Use local strategy to create user account
passport.use(new LocalStrategy(
  function(username, password, verified) {
    db.User.findOne({ where: { username: username }}).then(function(user) {
      if (!user) {
        verified(null, false, { message: 'Unknown user' });
      } 
      else {
        user.comparePassword(password, function(isMatch){
          if (!isMatch){
            verified(null, false, {message: 'Invalid password'});
          }
          else{
            verified(null, user, {message: 'Log in sucessful'});
          }
        });
      }
    });
  }
));

module.exports = passport;