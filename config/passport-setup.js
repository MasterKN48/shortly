const User=require('../models/User');
const passport = require('passport');
const key=require('./key');

// serialize && desearlize 
passport.serializeUser((user, done) =>{
    done(null, user.id);
  });
  
passport.deserializeUser((id, done)=> {
    User.getUserById(id,(err, user)=> {
      done(err, user);
    });
});
  

// Using LocalStrategy with passport
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
   	  if(err) throw err;
   	  if(!user){
   		   return done(null, false, {message: 'Unknown User'});
   	  }

     	User.comparePassword(password, user.password, function(err, isMatch){
     		if(err) throw err;
     		if(isMatch){
           console.log(user);
     			return done(null, user);
     		} else {
     			return done(null, false, {message: 'Invalid password'});
     		}
     	});
   });
  }
));

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: key.google.clientID,
    clientSecret: key.google.clientSecret,
    callbackURL: "http://localhost:5000/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOne({ 'google.id': profile.id }, function(err, user) {
      if (err) return done(err);
      if (user) return done(null, user);
      else {
        // if there is no user found with that facebook id, create them
        var newUser = new User();

        // set all of the facebook information in our user model
        newUser.google.id = profile.id;
        newUser.google.token = accessToken;
        newUser.google.name  = profile.displayName;
        newUser.google.image=profile.photos[0].value;
        if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
          newUser.google.email = profile.emails[0].value;

        // save our user to the database
        newUser.save()
        .then( user => {
          return done(null, user);
        })
        .catch(err => console.log(err));
      }
    });
  }
));

module.exports = passport;