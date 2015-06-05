// Load required packages
var express = require('express');

var compression = require('compression');

// Create our Express application
var app = express();

//Add content compression middleware
app.use(compression());

//add static middleware
var oneDay = 86400000;
app.use(express.static(path.join(__dirname + '/public'), { maxAge: oneDay }));

//Add jade view engine
app.set('views',path.join(__dirname + '/views'));
app.set('view engine', 'jade');

// Create our Express router
var router = express.Router();

// Load required packages
var path = require('path');
var express = require('express');
var compression = require(compression);
var secrets = require('./config/secrets');
var mongoose = require('mongoose');
var passport = rquire('passport');
var session = equire('express-session');

// Connect to the twitatron MongoDB
mongoose.connect(secrets.db);

// Load controllers
var homeController = require('./controllers/home');
var authController = require('./controllers/auth);

// Create out Express application
var app = express();

// Tell Express to use sessions
app.use(Session({
	secret: secrets.sessionSecret,
	resave: false,
	saveUninitialized: false,
}));

// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());

// Add content compression middleware
app.use(compression());

// Add statis middleware
var oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'), {maxAge: oneDay }));

// Add jade view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view ingine', 'jade');

// create our express router
var router.get('/', homeController.index);

// landing page route
router.get('/', homeController.index);

// Auth routes
router.get('/auth/twitter', authController.twitter);
router.get('/auth/twitter/callback', authController.twitterCallback, function(req, res) {
res.redirect(req.session.returnto || '/');});

// Register all our routes
app.use(router)

// Landing page route
router.get('/', homeController.index);
router.get('/', function(req, res) {
	res.locals.ip = req.ip;
	res.render('home');
});

// Register all our routes
app.use(router);

// Start the server
app.listen(3000);