const express  = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan=require('morgan');
const key=require('./config/key');
const authRoutes=require('./routes/auth');
const cors = require('cors');
// app
const app = express();
// Conenct to DB
mongoose.connect(key.mongodb.dbURI, { useNewUrlParser: true },() => {
  console.log('connected to mongodb');
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

app.use(cors());
// Express Session
require('./config/passport-setup');
app.use(cookieParser(key.session.cookieKey));
let expiryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days
app.use(session({
    secret: key.session.cookieKey,
    saveUninitialized: true,
    resave: true,
    cookie: { 
        secure:false,
        expires: expiryDate
      }
  }));
// Passport init
app.use(passport.initialize());
app.use(passport.session());
// temp routes
app.get('/success', (req, res) => res.send('login successfull '))
app.get('/login', (req, res) => res.send('Login please!'))
// auth routes
app.use('/api',authRoutes);

// url Routes
app.use('/', require('./routes/url'));
app.use('/api/url', require('./routes/url'));
// serve static asstes if in production
if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}
const port = process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port} 🔥`);