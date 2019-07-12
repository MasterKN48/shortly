const User=require('../models/User');
const router=require('express').Router();
const passport = require('passport');

router.post('/register',(req, res)=>{
	var password = req.body.password;
  console.log(req.body);
  if (password && req.body.name && req.body.email){
    var newUser = new User({
  		name: req.body.name,
  		email: req.body.email,
  		username: req.body.username,
  		password: req.body.password
  	});

  	User.createUser(newUser, function(err, user){
  		if(err) throw err;
  		res.status(200).json({errors:'',user})
  	});
  } else{
    res.status(500).json({errors: "Data is not complete"})
  }
});

// Endpoint to login
router.post('/login',
  passport.authenticate('local',{failureRedirect: 'http://localhost:3000/login'}),
  (req, res) =>{
    req.session.save(() => {
      res.status(200).json({msg:'login success',user:{name:req.user.name,id:req.user._id,email:req.user.email}});
    })
  }
);

// Endpoint to get current user
router.get('/user',passport.authenticate('local',{failureRedirect: '/login'}),(req, res)=>{
	res.status(200).json({msg:'current User',user:req.user});
})


// Endpoint to logout
router.get('/logout',(req, res)=>{
	req.logout();
	res.json({msg:'logout'})
});

// login with google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login',successRedirect: 'http://localhost:3000/dashboard' }),
  function(req, res) {
    // Successful authentication, redirect home.
   return res.json({user:req.user})
  });


// login with facebook
router.get('/auth/facebook',passport.authenticate('facebook')); //eg { scope: ['user_friends', 'manage_pages'] }

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.status(200).json({msg:'success',user:req.user});
  }
);


module.exports=router;