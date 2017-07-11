var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var Beer = require("./models/BeerModel");
var User = require("./models/UserModel");
var beerRoutes = require('./routes/beerRoutes.js');
var userRoutes = require('./routes/userRoutes.js');


mongoose.connect('mongodb://localhost/beers', function () {
  console.log("DB connection established!!!");
})

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(expressSession({
  secret: 'yourSecretHere',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This tells the server that when a request comes into '/beers'
//that it should use the routes in 'beerRoutes'
//and those are in our new beerRoutes.js file
app.use('/beers', beerRoutes);

app.use('/users', userRoutes);

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});