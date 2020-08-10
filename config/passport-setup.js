const User = require("../models/User");
const passport = require("passport");

// serialize && desearlize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

// Using LocalStrategy with passport
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (username, password, done) {
      User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "Unknown User" });
        }

        User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            console.log(user);
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid password" });
          }
        });
      });
    }
  )
);

module.exports = passport;
