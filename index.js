require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const compression = require("compression");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const app = express();

// Conenct to DB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB Connected");
  }
);

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
app.use(morgan("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Express Session

require("./config/passport-setup");
app.use(cookieParser(process.env.COOKIE_KEY));
let expiryDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 2 days
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    saveUninitialized: true,
    resave: true,
    cookie: {
      secure: false,
      expires: expiryDate,
    },
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// auth routes
app.use("/api", authRoutes);

app.get("/manifest.json", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "manifest.json"));
});
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "favicon.ico"));
});
app.get("/favicon.png", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "favicon.png"));
});

// url Routes
app.use("/", require("./routes/url"));
app.use("/api/url", require("./routes/url"));
// serve static asstes if in production

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
