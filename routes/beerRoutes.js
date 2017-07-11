var express = require('express');
var router = express.Router();
var Beer = require("../models/BeerModel");

//the beer routes go here


// Handles Success / Failure , and returns data
var handler = function (res, next) {
  return function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  }
}


var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status('401').send({
      message: "Unauthorized"
    });
  }
};


// for getting all the beers
router.get('/', function (req, res, next) {
  Beer.find(function (err, beers) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log('---  FETHING BEERS ---');
      // console.log(beers);
      res.json(beers);
    }
  })
}); //////////////////////////////


// find a single beer by id
router.get('/:_id', function (req, res, next) {
  Beer.findById(req.params._id, handler(res, next));
});

// to fetch all the beers data
router.post('/', ensureAuthenticated, function (req, res, next) {
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
router.delete('/:_id', ensureAuthenticated, function (req, res, next) {
  Beer.findByIdAndRemove(req.params._id, handler(res, next), function () {
    console.log('--- BEER DELETED ---');
  });
}); ////////////////////////////

// for updating a beer 
router.put('/:_id', ensureAuthenticated, function (req, res, next) {
  console.log(req.body);
  var updateObject = {
    $set: req.body
  };
  Beer.findByIdAndUpdate(req.params._id, updateObject, {
    new: true
  }, handler(res, next));
}); /////////////////////////////////

// for adding a rating to a beer
router.post('/:_id/ratings', ensureAuthenticated, function (req, res, next) {
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
router.post('/:_id/reviews', ensureAuthenticated, function (req, res, next) {
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
router.delete('/:_id/reviews/:review_id', ensureAuthenticated, function (req, res, next) {
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


module.exports = router;