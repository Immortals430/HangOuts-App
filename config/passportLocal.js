const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user || password != user.password) { return done(null, false); }
        
        return done(null, user);
      });
    }
  ));



  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });



  passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
  }

  passport.checkAuthentication = (req, res, next)=>{
      if(req.isAuthenticated()){
          return next();
      }
      res.redirect('/signInPage');
  }

  module.exports = passport;