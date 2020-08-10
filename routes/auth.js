const User = require("../models/User");
const router = require("express").Router();
const passport = require("passport");

router.post("/register", (req, res) => {
  var password = req.body.password;
  //console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((usr) => {
      if (usr) {
        return res.status(400).json({ errors: "Email already taken!" });
      } else {
        if (password && req.body.name && req.body.email) {
          var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
          });

          User.createUser(newUser, function (err, user) {
            if (err) throw err;
            user.password = undefined;
            return res.status(200).json({ errors: "", user });
          });
        } else {
          return res.status(500).json({ errors: "Data is not complete" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ errors: "Something went wrong" });
    });
});

// Endpoint to login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    req.session.save(() => {
      res.status(200).json({
        msg: "login success",
        user: {
          name: req.user.name,
          id: req.user._id,
          email: req.user.email,
        },
      });
    });
  }
);

// Endpoint to get current user
router.get(
  "/user",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.status(200).json({ msg: "current User", user: req.user });
  }
);

// Endpoint to logout
router.get("/logout", (req, res) => {
  req.logout();
  res.json({ msg: "logout" });
});

module.exports = router;
