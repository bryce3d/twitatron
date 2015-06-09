// Load required packages
var express = require('express');

var compression = require('compression');

// Create our Express application
var app = express();

//Add content compression middleware
app.use(compression());

//add static middleware
var oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));

//Add jade view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Create our Express router
var router = express.Router();

// Setup objects needed by views
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// Load required packages
var path = require('path');
var express = require('express');
var compression = require('compression');
var secrets = require('./config/secrets');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

// Connect to the twitatron MongoDB
mongoose.connect(secrets.db);

// Load controllers
var homeController = require('./controllers/home');
var authController = require('./controllers/auth');

// Create out Express application
var app = express();

// Tell Express to use sessions
app.use(session({
  secret: secrets.sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());

// Add content compression middleware
app.use(compression());

// Add static middleware
var oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));

// Add jade view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// create our express router
var router = express.Router();

// Landing page route
router.get('/', function(req, res) {
  res.locals.ip = req.ip;
  res.render('home');
});

// Load required packages
var path = require('path');
var express = require('express');
var compression = require('compression');

// Load controllers
var homeController = require('./controllers/home');

// Auth routes
router.get('/auth/twitter', authController.twitter);
router.get('/auth/twitter/callback', authController.twitterCallback, function(req, res) {
  res.redirect(req.session.returnTo || '/');});
router.get('/auth/logout', authController.logout);

// Landing page route
router.get('/', homeController.index);

// Register all our routes
app.use(router)


// Start the server
app.listen(3000);