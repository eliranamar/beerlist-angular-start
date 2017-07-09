var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('lodash');
var app = express();
var Beer = require("./beerModel.js");

mongoose.connect('mongodb://localhost/beers', function () {
  console.log("DB connection established!!!");
})

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Handles Success / Failure , and returns data
var handler = function (res, next) {
  return function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  }
}

// for getting all the beers
app.get('/beers', function (req, res, next) {
  Beer.find(function (err, beers) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log('---  FETHING BEERS ---');
      console.log(beers);
      res.json(beers);
    }
  })
}); //////////////////////////////


// find a single beer by id
app.get('/beers/:_id', function (req, res, next) {
  Beer.findById(req.params._id, handler(res, next));
});

// to fetch all the beers data
app.post('/beers', function (req, res, next) {
  var BeerToSave = new Beer(req.body);
  BeerToSave.save(handler(res, next));
  // Beer.findOne({
  //   name: BeerToSave.name
  // }, function (err, data) {
  //   BeerToSave.save(handler(res, next));
  //   if (!data) {} else {
  //     data.ratings.push(req.body.ratings);
  //     data.save(handler(res, next));
  //   }
  // });
}); //////////////////////////////

// delete a beer by id
app.delete('/beers/:_id', function (req, res, next) {
  Beer.findByIdAndRemove(req.params._id, handler(res, next), function () {
    console.log('--- BEER DELETED ---');
  });
}); ////////////////////////////

// for updating a beer 
app.put('/beers/:_id', function (req, res, next) {
  console.log(req.body);
  var updateObject = {
    $set: req.body
  };
  Beer.findByIdAndUpdate(req.params._id, updateObject, {
    new: true
  }, handler(res, next));
}); /////////////////////////////////

// for adding a rating to a beer
app.post('/beers/:_id/ratings', function (req, res, next) {
  //code a suitable update object 
  //using req.body to retrieve the new rating
  var updateObject = {
    $push: {
      ratings: req.body.ratings
    }
  };
  Beer.findByIdAndUpdate(req.params._id, updateObject, {
    new: true
  }, handler(res, next));
}); //////////////////////////////////

// for adding reviews for a beer
app.post('/beers/:_id/reviews', function (req, res, next) {
  var updateObject = {
    $push: {
      reviews: req.body
    }
  };
  Beer.findByIdAndUpdate(req.params._id, updateObject, {
    new: true
  }, handler(res, next));
}); /////////////////////////////////////

// for deleting review from a beer
app.delete('/beers/:_id/reviews/:review_id', function (req, res, next) {
  var updateObject = {
    $pull: {
      reviews: {
        _id: req.params.review_id
      }
    }
  };
  Beer.findByIdAndUpdate(req.params._id, updateObject, {
    new: true
  }, handler(res, next));
}) ///////////////////////////////////////



// error handler to catch 404 and forward to main error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});